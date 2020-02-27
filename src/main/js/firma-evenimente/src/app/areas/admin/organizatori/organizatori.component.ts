import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Organizatori } from 'src/app/Models/admin/organizatori';
import { TipMomentArtistic } from 'src/app/Models/admin/tip-moment-artistic';
import { ToastrService } from 'src/app/services/toastr.service';
import { OrganizatoriService } from './organizatori.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { TipMomentArtisticService } from '../tip-moment-artistic/tip-moment-artistic.service';
import { AddEditOrganizatoriComponent } from './add-edit-organizatori/add-edit-organizatori.component';

@Component({
  selector: 'app-organizatori',
  templateUrl: './organizatori.component.html',
  styleUrls: ['./organizatori.component.scss']
})
export class OrganizatoriComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addOrganizatori: Organizatori;
  organizatorii: Organizatori[] = [];
  displayedColumns: string[] = ['id_organizator',
  'nume',
   'prenume',
   'adresa_mail', 'numar_contact', 'numar_evenimente_organizate', 'actions'];
  dataSource: MatTableDataSource<Organizatori> = new MatTableDataSource(
    this.organizatorii
  );

  constructor(
    private toastr: ToastrService,
    private organizatoriiService: OrganizatoriService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private tipOrganizatoriService: TipMomentArtisticService
  ) {}

  ngOnInit() {
    this.GetOrganizatori();
    this.titleService.setTitle("faUsersCog", "Organizatori");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource(){
    this.dataSource = new MatTableDataSource(this.organizatorii);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetOrganizatori() {
    this.loadingService.start();

    this.organizatoriiService
      .GetOrganizatori()
      .subscribe((response: Organizatori[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.organizatorii = response;
        this.UpdateDataSource();
      });
  }

  DeleteOrganizatori(user: Organizatori) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest organizator?',
      html: `Id: <b>${user.id_organizator}</b> - Nume: <b>${user.nume} ${user.prenume}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {

        this.loadingService.start();

        this.organizatoriiService.DeleteOrganizatori(user.id_organizator).subscribe(
          (response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Organizatorul a fost sters.',
                icon: 'success'
              });
              this.GetOrganizatori();
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

  AddOrganizatori() {
    const dialogRef = this.dialog.open(AddEditOrganizatoriComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addOrganizatori
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddOrganizatoriConfirm(result);
      }
    });
  }

  AddOrganizatoriConfirm(organizatori: Organizatori) {

    this.loadingService.start();

    this.organizatoriiService.AddOrganizatori(organizatori).subscribe(
      (response: Organizatori) => {
        this.loadingService.stop();

        if (response.id_organizator == -1){
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        }
        else
        {
          this.toastr.Toast.fire({
            title: "Organizatorul a fost adaugat cu succes",
            icon: "success"
          });
          this.organizatorii.push(response);
          this.UpdateDataSource();
        }
      }
    )

  }

  EditOrganizatori(item: Organizatori){
    const dialogRef = this.dialog.open(AddEditOrganizatoriComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditOrganizatoriConfirm(result, item);
      }
    });
  }

  EditOrganizatoriConfirm(organizatori: Organizatori, old: Organizatori) {

    this.loadingService.start();

    this.organizatoriiService.UpdateOrganizatori(organizatori, organizatori.id_organizator).subscribe(
      (response: Organizatori) => {
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
            title: "Organizatorul a fost editat cu succes",
            icon: "success"
          });
          let idxOld = this.organizatorii.indexOf(old);
          this.organizatorii[idxOld] = organizatori;
          this.UpdateDataSource();
        }
      }
    )

  }

}
