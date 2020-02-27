import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TipServireMeniu } from 'src/app/Models/admin/tip-servire-meniu';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipServireMeniuService } from './tip-servire-meniu.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditTipServireMeniuComponent } from './add-edit-tip-servire-meniu/add-edit-tip-servire-meniu.component';

@Component({
  selector: 'app-tip-servire-meniu',
  templateUrl: './tip-servire-meniu.component.html',
  styleUrls: ['./tip-servire-meniu.component.scss']
})
export class TipServireMeniuComponent implements OnInit {



  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipServireMeniu: TipServireMeniu;
  tipServireMeniu: TipServireMeniu[] = [];
  displayedColumns: string[] = [
    'id_tip_servire_meniu',
    'denumire_tip_servire',
    'imagine_tip_servire_src',
    'actions'
  ];
  dataSource: MatTableDataSource<TipServireMeniu> = new MatTableDataSource(
    this.tipServireMeniu
  );

  constructor(
    private toastr: ToastrService,
    private tipServireMeniuService: TipServireMeniuService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.GetTipServireMeniu();
    this.titleService.setTitle('faUtensils','Tip servire meniu');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipServireMeniu);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipServireMeniu() {
    this.loadingService.start();

    this.tipServireMeniuService.GetTipServireMeniu().subscribe((response: TipServireMeniu[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: 'info',
          title: 'Nu exista date in baza de date!'
        });
      }

      this.tipServireMeniu = response;
      this.tipServireMeniu.forEach(e => {
        if (e.imagine_tip_servire) {
          const objectURL = 'data:image/png;base64,' + e.imagine_tip_servire;
          e.imagine_tip_servire_src = this.sanitizer.bypassSecurityTrustResourceUrl(
            objectURL
          );
        }
      });
      this.UpdateDataSource();
    });
  }

  DeleteTipServireMeniu(tipServireMeniu: TipServireMeniu) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de servire meniu?',
      html: `Id: <b>${tipServireMeniu.id_tip_servire_meniu}</b> - Nume: <b>${tipServireMeniu.denumire_tip_servire}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipServireMeniuService
          .DeleteTipServireMeniu(tipServireMeniu.id_tip_servire_meniu)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de servire meniu a fost sters.',
                icon: 'success'
              });
              this.GetTipServireMeniu();
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

  AddTipServireMeniu() {
    const dialogRef = this.dialog.open(AddEditTipServireMeniuComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipServireMeniu
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipServireMeniuConfirm(result);
      }
    });
  }

  AddTipServireMeniuConfirm(tipServireMeniu: TipServireMeniu) {
    this.loadingService.start();

    this.tipServireMeniuService.AddTipServireMeniu(tipServireMeniu).subscribe((response: TipServireMeniu) => {
      this.loadingService.stop();

      if (response.id_tip_servire_meniu == -1) {
        this.toastr.Swal.fire(
          'Eroare!',
          'A aparut o eroare la adugare, incearca din nou!',
          'error'
        );
      } else {
        this.toastr.Toast.fire({
          title: 'Tipul de servire meniu a fost adaugat cu succes',
          icon: 'success'
        });
        this.tipServireMeniu.push(response);
        response.imagine_tip_servire_src =
          'data:image/png;base64,' + response.imagine_tip_servire;
        this.UpdateDataSource();
      }
    });
  }

  EditTipServireMeniu(item: TipServireMeniu) {
    const dialogRef = this.dialog.open(AddEditTipServireMeniuComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditTipServireMeniuConfirm(result, item);
      }
    });
  }

  EditTipServireMeniuConfirm(tipServireMeniu: TipServireMeniu, old: TipServireMeniu) {
    this.loadingService.start();

    this.tipServireMeniuService
      .UpdateTipServireMeniu(tipServireMeniu, tipServireMeniu.id_tip_servire_meniu)
      .subscribe((response: TipServireMeniu) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de servire meniu a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.tipServireMeniu.indexOf(old);
          this.tipServireMeniu[idxOld] = tipServireMeniu;
          this.UpdateDataSource();
        }
      });
  }
}
