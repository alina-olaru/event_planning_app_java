import { TipServireMeniu } from './../../../Models/admin/tip-servire-meniu';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TipMeniu } from 'src/app/Models/admin/tip-meniu';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipMeniuService } from './tip-meniu.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditTipMeniuComponent } from './add-edit-tip-meniu/add-edit-tip-meniu.component';
import { TipServireMeniuService } from '../tip-servire-meniu/tip-servire-meniu.service';

@Component({
  selector: 'app-tip-meniu',
  templateUrl: './tip-meniu.component.html',
  styleUrls: ['./tip-meniu.component.scss']
})
export class TipMeniuComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipMeniu: TipMeniu;
  tipMeniu: TipMeniu[] = [];
  tipTipMeniu: TipServireMeniu[] = [];
  displayedColumns: string[] = [
    'id_tip_meniu',
    'nume_meniu',
    'denumire_tip_servire',
    'clienti_targetati',
    'reducere',
    'minim_portii_pentru_reducere',
    'cost_tip_meniu',
    'imagine_meniu_src',
    'actions'
  ];
  dataSource: MatTableDataSource<TipMeniu> = new MatTableDataSource(
    this.tipMeniu
  );

  constructor(
    private toastr: ToastrService,
    private tipMeniuService: TipMeniuService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    private subTipMeniuService: TipServireMeniuService
  ) {}

  ngOnInit() {
    this.GetTipMeniu();
    this.GetTipServireMeniu();
    this.titleService.setTitle('faClipboardList', 'Tip meniu');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipMeniu);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipServireMeniu() {
    this.subTipMeniuService.GetTipServireMeniu().subscribe(response => {
      this.tipTipMeniu = response;
    });
  }

  GetTipMeniu() {
    this.loadingService.start();

    this.tipMeniuService
      .GetTipMeniu()
      .subscribe((response: TipMeniu[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.tipMeniu = response;
        this.tipMeniu.forEach(e => {
          if (e.imagine_meniu) {
            const objectURL = 'data:image/png;base64,' + e.imagine_meniu;
            e.imagine_meniu_src = this.sanitizer.bypassSecurityTrustResourceUrl(
              objectURL
            );
          }
        });
        this.UpdateDataSource();
      });
  }

  DeleteTipMeniu(tipMeniu: TipMeniu) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de meniu?',
      html: `Id: <b>${tipMeniu.id_tip_meniu}</b> - Nume: <b>${tipMeniu.nume_meniu}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipMeniuService
          .DeleteTipMeniu(tipMeniu.id_tip_meniu)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de meniu sters.',
                icon: 'success'
              });
              this.GetTipMeniu();
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

  AddTipMeniu() {
    const dialogRef = this.dialog.open(AddEditTipMeniuComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipMeniu,
        dropdown: this.tipTipMeniu
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipMeniuConfirm(result);
      }
    });
  }

  AddTipMeniuConfirm(tipMeniu: TipMeniu) {
    this.loadingService.start();

    this.tipMeniuService
      .AddTipMeniu(tipMeniu)
      .subscribe((response: TipMeniu) => {
        this.loadingService.stop();

        if (response.id_tip_meniu == -1) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de meniu a fost adaugat cu succes',
            icon: 'success'
          });
          this.tipMeniu.push(response);
          if (response.imagine_meniu) {
            response.imagine_meniu_src =
              'data:image/png;base64,' + response.imagine_meniu;
          }
          this.UpdateDataSource();
        }
      });
  }

  EditTipMeniu(item: TipMeniu) {
    const dialogRef = this.dialog.open(AddEditTipMeniuComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.tipTipMeniu
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditTipMeniuConfirm(result, item);
      }
    });
  }

  EditTipMeniuConfirm(tipMeniu: TipMeniu, old: TipMeniu) {
    this.loadingService.start();

    this.tipMeniuService
      .UpdateTipMeniu(tipMeniu, tipMeniu.id_tip_meniu)
      .subscribe((response: TipMeniu) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de meniu a fost editat cu succes',
            icon: 'success'
          });
          const idxOld = this.tipMeniu.indexOf(old);
          this.tipMeniu[idxOld] = tipMeniu;
          this.UpdateDataSource();
        }
      });
  }

}
