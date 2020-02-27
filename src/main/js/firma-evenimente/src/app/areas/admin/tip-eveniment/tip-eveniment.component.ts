import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TipEveniment } from 'src/app/Models/admin/tip-eveniment';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipEvenimentService } from './tip-eveniment.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditTipEvenimentComponent } from './add-edit-tip-eveniment/add-edit-tip-eveniment.component';

@Component({
  selector: 'app-tip-eveniment',
  templateUrl: './tip-eveniment.component.html',
  styleUrls: ['./tip-eveniment.component.scss']
})
export class TipEvenimentComponent implements OnInit {



  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipEveniment: TipEveniment;
  tipEveniment: TipEveniment[] = [];
  displayedColumns: string[] = [
    'id_tip_eveniment',
    'nume_categorie_eveniment',
    'numar_evenimente_organizate_per_categorie',
    'imagine_tip_eveniment_src',
    'actions'
  ];
  dataSource: MatTableDataSource<TipEveniment> = new MatTableDataSource(
    this.tipEveniment
  );

  constructor(
    private toastr: ToastrService,
    private tipEvenimentService: TipEvenimentService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.GetTipEveniment();
    this.titleService.setTitle('faChessRook','Tip eveniment');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipEveniment);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipEveniment() {
    this.loadingService.start();

    this.tipEvenimentService.GetTipEveniment().subscribe((response: TipEveniment[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: 'info',
          title: 'Nu exista date in baza de date!'
        });
      }

      this.tipEveniment = response;
      this.tipEveniment.forEach(e => {
        if (e.imagine_tip_eveniment) {
          const objectURL = 'data:image/png;base64,' + e.imagine_tip_eveniment;
          e.imagine_tip_eveniment_src = this.sanitizer.bypassSecurityTrustResourceUrl(
            objectURL
          );
        }
      });
      this.UpdateDataSource();
    });
  }

  DeleteTipEveniment(tipEveniment: TipEveniment) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de eveniment?',
      html: `Id: <b>${tipEveniment.id_tip_eveniment}</b> - Nume: <b>${tipEveniment.nume_categorie_eveniment}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipEvenimentService
          .DeleteTipEveniment(tipEveniment.id_tip_eveniment)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de eveniment a fost sters.',
                icon: 'success'
              });
              this.GetTipEveniment();
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

  AddTipEveniment() {
    const dialogRef = this.dialog.open(AddEditTipEvenimentComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipEveniment
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipEvenimentConfirm(result);
      }
    });
  }

  AddTipEvenimentConfirm(tipEveniment: TipEveniment) {
    this.loadingService.start();

    this.tipEvenimentService.AddTipEveniment(tipEveniment).subscribe((response: TipEveniment) => {
      this.loadingService.stop();

      if (response.id_tip_eveniment == -1) {
        this.toastr.Swal.fire(
          'Eroare!',
          'A aparut o eroare la adugare, incearca din nou!',
          'error'
        );
      } else {
        this.toastr.Toast.fire({
          title: 'Tipul de eveniment a fost adaugat cu succes',
          icon: 'success'
        });
        this.tipEveniment.push(response);
        response.imagine_tip_eveniment_src =
          'data:image/png;base64,' + response.imagine_tip_eveniment;
        this.UpdateDataSource();
      }
    });
  }

  EditTipEveniment(item: TipEveniment) {
    const dialogRef = this.dialog.open(AddEditTipEvenimentComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditTipEvenimentConfirm(result, item);
      }
    });
  }

  EditTipEvenimentConfirm(tipEveniment: TipEveniment, old: TipEveniment) {
    this.loadingService.start();

    this.tipEvenimentService
      .UpdateTipEveniment(tipEveniment, tipEveniment.id_tip_eveniment)
      .subscribe((response: TipEveniment) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de eveniment a fost editat cu succes',
            icon: 'success'
          });
          const idxOld = this.tipEveniment.indexOf(old);
          this.tipEveniment[idxOld] = tipEveniment;
          this.UpdateDataSource();
        }
      });
  }

}
