import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TipMomentArtistic } from 'src/app/Models/admin/tip-moment-artistic';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipMomentArtisticService } from './tip-moment-artistic.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditTipMomentArtisticComponent } from './add-edit-tip-moment-artistic/add-edit-tip-moment-artistic.component';

@Component({
  selector: 'app-tip-moment-artistic',
  templateUrl: './tip-moment-artistic.component.html',
  styleUrls: ['./tip-moment-artistic.component.scss']
})
export class TipMomentArtisticComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipMomentArtistic: TipMomentArtistic;
  tipMomentArtistic: TipMomentArtistic[] = [];
  displayedColumns: string[] = [
    'id_tip_moment',
    'nume_categorie_moment_artistic',
    'imagine_tip_moment_artistic_src',
    'actions'
  ];
  dataSource: MatTableDataSource<TipMomentArtistic> = new MatTableDataSource(
    this.tipMomentArtistic
  );

  constructor(
    private toastr: ToastrService,
    private tipMomentArtisticService: TipMomentArtisticService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.GetTipMomentArtistic();
    this.titleService.setTitle('faMagic','Tip moment artistic');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipMomentArtistic);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipMomentArtistic() {
    this.loadingService.start();

    this.tipMomentArtisticService.GetTipMomentArtistic().subscribe((response: TipMomentArtistic[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: 'info',
          title: 'Nu exista date in baza de date!'
        });
      }

      this.tipMomentArtistic = response;
      this.tipMomentArtistic.forEach(e => {
        if (e.imagine_tip_moment_artistic) {
          const objectURL = 'data:image/png;base64,' + e.imagine_tip_moment_artistic;
          e.imagine_tip_moment_artistic_src = this.sanitizer.bypassSecurityTrustResourceUrl(
            objectURL
          );
        }
      });
      this.UpdateDataSource();
    });
  }

  DeleteTipMomentArtistic(tipMomentArtistic: TipMomentArtistic) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de media?',
      html: `Id: <b>${tipMomentArtistic.id_tip_moment}</b> - Nume: <b>${tipMomentArtistic.nume_categorie_moment_artistic}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipMomentArtisticService
          .DeleteTipMomentArtistic(tipMomentArtistic.id_tip_moment)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de moment artistic a fost sters.',
                icon: 'success'
              });
              this.GetTipMomentArtistic();
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

  AddTipMomentArtistic() {
    const dialogRef = this.dialog.open(AddEditTipMomentArtisticComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipMomentArtistic
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipMomentArtisticConfirm(result);
      }
    });
  }

  AddTipMomentArtisticConfirm(tipMomentArtistic: TipMomentArtistic) {
    this.loadingService.start();

    this.tipMomentArtisticService.AddTipMomentArtistic(tipMomentArtistic).subscribe((response: TipMomentArtistic) => {
      this.loadingService.stop();

      if (response.id_tip_moment == -1) {
        this.toastr.Swal.fire(
          'Eroare!',
          'A aparut o eroare la adugare, incearca din nou!',
          'error'
        );
      } else {
        this.toastr.Toast.fire({
          title: 'Tipul de moment artistic a fost adaugat cu succes',
          icon: 'success'
        });
        this.tipMomentArtistic.push(response);
        response.imagine_tip_moment_artistic_src =
          'data:image/png;base64,' + response.imagine_tip_moment_artistic;
        this.UpdateDataSource();
      }
    });
  }

  EditTipMomentArtistic(item: TipMomentArtistic) {
    const dialogRef = this.dialog.open(AddEditTipMomentArtisticComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditTipMomentArtisticConfirm(result, item);
      }
    });
  }

  EditTipMomentArtisticConfirm(tipMomentArtistic: TipMomentArtistic, old: TipMomentArtistic) {
    this.loadingService.start();

    this.tipMomentArtisticService
      .UpdateTipMomentArtistic(tipMomentArtistic, tipMomentArtistic.id_tip_moment)
      .subscribe((response: TipMomentArtistic) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de moment artistic a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.tipMomentArtistic.indexOf(old);
          this.tipMomentArtistic[idxOld] = tipMomentArtistic;
          this.UpdateDataSource();
        }
      });
  }


}
