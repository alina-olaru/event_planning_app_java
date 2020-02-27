import { TitleService } from './../services/title.service';
import { AddEditTipUtilizatoriComponent } from './add-edit-tip-utilizatori/add-edit-tip-utilizatori.component';
import { TipUtilizator } from './../../../Models/admin/tip-utilizator';
import { LoadingService } from './../../../modules/loading-spinner/loading.service';
import { TipUtilizatoriService } from './tip-utilizatori.service';
import { ToastrService } from './../../../services/toastr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from '@angular/material';

@Component({
  selector: 'app-tip-utilizatori',
  templateUrl: './tip-utilizatori.component.html',
  styleUrls: ['./tip-utilizatori.component.scss']
})
export class TipUtilizatoriComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipUser: TipUtilizator;
  tipUtilizatori: TipUtilizator[] = [];
  displayedColumns: string[] = ['id_nivel_acces', 'rol', 'actions'];
  dataSource: MatTableDataSource<TipUtilizator> = new MatTableDataSource(
    this.tipUtilizatori
  );

  constructor(
    private toastr: ToastrService,
    private tipUtilizatoriService: TipUtilizatoriService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.GetTipUtilizatori();
    this.titleService.setTitle("faUserCog", "Tip utilizatori");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource(){
    this.dataSource = new MatTableDataSource(this.tipUtilizatori);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipUtilizatori() {
    this.loadingService.start();

    this.tipUtilizatoriService
      .GetTipUtilizatori()
      .subscribe((response: TipUtilizator[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.tipUtilizatori = response;
        this.UpdateDataSource();
      });
  }

  DeleteTipUtilizator(user: TipUtilizator) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de utilizator?',
      html: `Tip utilizator: <b>${user.rol}</b><br>Aceasta actiune va sterge si toti utilizatorii cu acest rol!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {

        this.loadingService.start();

        this.tipUtilizatoriService.DeleteTipUtilizatori(user.id_nivel_acces).subscribe(
          (response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de utilizator a fost sters.',
                icon: 'success'
              });
              this.GetTipUtilizatori();
            } else {
              this.toastr.Swal.fire(
                'Eroare!',
                'A aparut o eroare la stergere, incearca din nou!',
                'error'
              );
            }
          }
        );
      }
    });
  }

  AddTipUtilizator() {
    const dialogRef = this.dialog.open(AddEditTipUtilizatoriComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipUtilizatorConfirm(result.model);
      }
    });
  }

  AddTipUtilizatorConfirm(tipUtilizator: TipUtilizator) {

    this.loadingService.start();

    this.tipUtilizatoriService.AddTipUtilizator(tipUtilizator).subscribe(
      (response: TipUtilizator) => {
        this.loadingService.stop();

        if (response.id_nivel_acces == -1){
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        }
        else
        {
          this.toastr.Toast.fire({
            title: "Tipul de utilizator a fost adaugat cu succes",
            icon: "success"
          });
          this.tipUtilizatori.push(response);
          this.UpdateDataSource();
        }
      }
    )

  }
}
