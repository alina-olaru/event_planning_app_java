import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TipMedia } from 'src/app/Models/admin/tip-media';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipMediaService } from './tip-media.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditTipMediaComponent } from './add-edit-tip-media/add-edit-tip-media.component';

@Component({
  selector: 'app-tip-media',
  templateUrl: './tip-media.component.html',
  styleUrls: ['./tip-media.component.scss']
})
export class TipMediaComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipMedia: TipMedia;
  tipMedia: TipMedia[] = [];
  displayedColumns: string[] = [
    'id_tip_media',
    'nume_media',
    'imagine_tip_media_src',
    'actions'
  ];
  dataSource: MatTableDataSource<TipMedia> = new MatTableDataSource(
    this.tipMedia
  );

  constructor(
    private toastr: ToastrService,
    private tipMediaService: TipMediaService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.GetTipMedia();
    this.titleService.setTitle('faIcons','Tip Media');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipMedia);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipMedia() {
    this.loadingService.start();

    this.tipMediaService.GetTipMedia().subscribe((response: TipMedia[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: 'info',
          title: 'Nu exista date in baza de date!'
        });
      }

      this.tipMedia = response;
      this.tipMedia.forEach(e => {
        if (e.imagine_tip_media) {
          const objectURL = 'data:image/png;base64,' + e.imagine_tip_media;
          e.imagine_tip_media_src = this.sanitizer.bypassSecurityTrustResourceUrl(
            objectURL
          );
        }
      });
      this.UpdateDataSource();
    });
  }

  DeleteTipMedia(tipMedia: TipMedia) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de media?',
      html: `Id: <b>${tipMedia.id_tip_media}</b> - Nume: <b>${tipMedia.nume_media}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipMediaService
          .DeleteTipMedia(tipMedia.id_tip_media)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de media a fost sters.',
                icon: 'success'
              });
              this.GetTipMedia();
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

  AddTipMedia() {
    const dialogRef = this.dialog.open(AddEditTipMediaComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipMedia
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipMediaConfirm(result);
      }
    });
  }

  AddTipMediaConfirm(tipMedia: TipMedia) {
    this.loadingService.start();

    this.tipMediaService.AddTipMedia(tipMedia).subscribe((response: TipMedia) => {
      this.loadingService.stop();

      if (response.id_tip_media == -1) {
        this.toastr.Swal.fire(
          'Eroare!',
          'A aparut o eroare la adugare, incearca din nou!',
          'error'
        );
      } else {
        this.toastr.Toast.fire({
          title: 'Tipul de media a fost adaugat cu succes',
          icon: 'success'
        });
        this.tipMedia.push(response);
        response.imagine_tip_media_src =
          'data:image/png;base64,' + response.imagine_tip_media;
        this.UpdateDataSource();
      }
    });
  }

  EditTipMedia(item: TipMedia) {
    const dialogRef = this.dialog.open(AddEditTipMediaComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditTipMediaConfirm(result, item);
      }
    });
  }

  EditTipMediaConfirm(tipMedia: TipMedia, old: TipMedia) {
    this.loadingService.start();

    this.tipMediaService
      .UpdateTipMedia(tipMedia, tipMedia.id_tip_media)
      .subscribe((response: TipMedia) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de media a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.tipMedia.indexOf(old);
          this.tipMedia[idxOld] = tipMedia;
          this.UpdateDataSource();
        }
      });
  }

}
