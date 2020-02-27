import { TipMediaService } from './../tip-media/tip-media.service';
import { TipMedia } from './../../../Models/admin/tip-media';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Media } from 'src/app/Models/admin/media';
import { ToastrService } from 'src/app/services/toastr.service';
import { MediaService } from './media.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditMediaComponent } from './add-edit-media/add-edit-media.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addMedia: Media;
  media: Media[] = [];
  tipMedia: TipMedia[] = [];
  displayedColumns: string[] = [
    'id_media',
    'denumire',
    'nume_media',
    'pret',
    'descriere',
    'imagine_media_src',
    'actions'
  ];
  dataSource: MatTableDataSource<Media> = new MatTableDataSource(
    this.media
  );

  constructor(
    private toastr: ToastrService,
    private mediaService: MediaService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    private subMediaService: TipMediaService
  ) {}

  ngOnInit() {
    this.GetMedia();
    this.GetTipMedia();
    this.titleService.setTitle('faCamera', 'Media');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.media);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipMedia() {
    this.subMediaService.GetTipMedia().subscribe(response => {
      this.tipMedia = response;
    });
  }

  GetMedia() {
    this.loadingService.start();

    this.mediaService
      .GetMedia()
      .subscribe((response: Media[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.media = response;
        this.media.forEach(e => {
          if (e.imagine_media) {
            const objectURL = 'data:image/png;base64,' + e.imagine_media;
            e.imagine_media_src = this.sanitizer.bypassSecurityTrustResourceUrl(
              objectURL
            );
          }
        });
        this.UpdateDataSource();
      });
  }

  DeleteMedia(media: Media) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de media?',
      html: `Id: <b>${media.id_media}</b> - Nume: <b>${media.denumire}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.mediaService
          .DeleteMedia(media.id_media)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tip media sters.',
                icon: 'success'
              });
              this.GetMedia();
            } else {
              this.toastr.Swal.fire(
                'Eroare!',
                'A aparut o eroare la stergere, incearca din nou!',
                'error'
              );
            }
          });
      }
    });
  }

  AddMedia() {
    const dialogRef = this.dialog.open(AddEditMediaComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addMedia,
        dropdown: this.tipMedia
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddMediaConfirm(result);
      }
    });
  }

  AddMediaConfirm(media: Media) {
    this.loadingService.start();

    this.mediaService
      .AddMedia(media)
      .subscribe((response: Media) => {
        this.loadingService.stop();

        if (response.id_media == -1) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Media a fost adaugata cu succes',
            icon: 'success'
          });
          this.media.push(response);
          if (response.imagine_media) {
            response.imagine_media_src =
              'data:image/png;base64,' + response.imagine_media;
          }
          this.UpdateDataSource();
        }
      });
  }

  EditMedia(item: Media) {
    const dialogRef = this.dialog.open(AddEditMediaComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.tipMedia
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditMediaConfirm(result, item);
      }
    });
  }

  EditMediaConfirm(media: Media, old: Media) {
    this.loadingService.start();

    this.mediaService
      .UpdateMedia(media, media.id_media)
      .subscribe((response: Media) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Media a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.media.indexOf(old);
          this.media[idxOld] = media;
          this.UpdateDataSource();
        }
      });
  }

}
