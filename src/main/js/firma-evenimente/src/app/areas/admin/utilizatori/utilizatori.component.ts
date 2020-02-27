import { AddEditUtilizatoriComponent } from './add-edit-utilizatori/add-edit-utilizatori.component';
import { TipUtilizatoriService } from './../tip-utilizatori/tip-utilizatori.service';
import { Utilizator } from './../../../Models/admin/utilizator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastrService } from 'src/app/services/toastr.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { UtilizatoriService } from './utilizatori.service';
import { TipUtilizator } from 'src/app/Models/admin/tip-utilizator';

@Component({
  selector: 'app-utilizatori',
  templateUrl: './utilizatori.component.html',
  styleUrls: ['./utilizatori.component.scss']
})
export class UtilizatoriComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addUtilizator: Utilizator;
  utilizatori: Utilizator[] = [];
  tipUtilizatori: TipUtilizator[]=[];
  displayedColumns: string[] = ['id_utilizator', 'nume', 'prenume', 'numar_telefon', 'adresa_mail', 'numar_evenimente_create', 'username', 'parola', 'rol', 'actions'];
  dataSource: MatTableDataSource<Utilizator> = new MatTableDataSource(
    this.utilizatori
  );

  constructor(
    private toastr: ToastrService,
    private utilizatoriService: UtilizatoriService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private tipUtilizatoriService: TipUtilizatoriService
  ) {}

  ngOnInit() {
    this.GetUtilizatori();
    this.GetTipUtilizatori();
    this.titleService.setTitle("faUsers", "Utilizatori");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource(){
    this.dataSource = new MatTableDataSource(this.utilizatori);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipUtilizatori() {
    this.tipUtilizatoriService
      .GetTipUtilizatori()
      .subscribe((response: TipUtilizator[]) => {
        this.tipUtilizatori = response;
      });
  }

  GetUtilizatori() {
    this.loadingService.start();

    this.utilizatoriService
      .GetUtilizatori()
      .subscribe((response: Utilizator[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.utilizatori = response;
        this.UpdateDataSource();
      });
  }

  DeleteUtilizator(user: Utilizator) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest utilizator?',
      html: `Id: <b>${user.id_utilizator}</b> - Nume: <b>${user.nume} ${user.prenume}</b>
      <br>
      Rol: <b>${user.rol}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {

        this.loadingService.start();

        this.utilizatoriService.DeleteUtilizatori(user.id_utilizator).subscribe(
          (response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Utilizatorul a fost sters.',
                icon: 'success'
              });
              this.GetUtilizatori();
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

  AddUtilizator() {
    const dialogRef = this.dialog.open(AddEditUtilizatoriComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addUtilizator,
        roluri: this.tipUtilizatori
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddUtilizatorConfirm(result);
      }
    });
  }

  AddUtilizatorConfirm(utilizator: Utilizator) {

    this.loadingService.start();

    this.utilizatoriService.AddUtilizator(utilizator).subscribe(
      (response: Utilizator) => {
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
            title: "Utilizatorul a fost adaugat cu succes",
            icon: "success"
          });
          this.utilizatori.push(response);
          this.UpdateDataSource();
        }
      }
    )

  }

  EditUtilizator(item: Utilizator){
    const dialogRef = this.dialog.open(AddEditUtilizatoriComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        roluri: this.tipUtilizatori
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditUtilizatorConfirm(result, item);
      }
    });
  }

  EditUtilizatorConfirm(utilizator: Utilizator, old: Utilizator) {

    this.loadingService.start();

    this.utilizatoriService.UpdateUtilizator(utilizator, utilizator.id_utilizator).subscribe(
      (response: Utilizator) => {
        this.loadingService.stop();

        if (response == null){
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        }
        else
        {
          this.toastr.Toast.fire({
            title: "Utilizatorul a fost editat cu succes",
            icon: "success"
          });
          let idxOld = this.utilizatori.indexOf(old);
          this.utilizatori[idxOld] = utilizator;
          this.UpdateDataSource();
        }
      }
    )

  }

}
