import { TipMomentArtisticService } from './../tip-moment-artistic/tip-moment-artistic.service';
import { TipMomentArtistic } from './../../../Models/admin/tip-moment-artistic';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { MomenteArtistice } from 'src/app/Models/admin/momente-artistice';
import { ToastrService } from 'src/app/services/toastr.service';
import { MomenteArtisticeService } from './momente-artistice.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { AddEditMomenteArtisticeComponent } from './add-edit-momente-artistice/add-edit-momente-artistice.component';

@Component({
  selector: 'app-momente-artistice',
  templateUrl: './momente-artistice.component.html',
  styleUrls: ['./momente-artistice.component.scss']
})
export class MomenteArtisticeComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addMomenteArtistice: MomenteArtistice;
  momenteArtisticei: MomenteArtistice[] = [];
  tipMomenteArtistice: TipMomentArtistic[]=[];
  displayedColumns: string[] = ['id_moment_artistic', 'nume_tip_moment_artistic', 'nume_categorie_moment_artistic', 'timp_moment', 'pret_per_moment', 'numar_persoane_implicate', 'actions'];
  dataSource: MatTableDataSource<MomenteArtistice> = new MatTableDataSource(
    this.momenteArtisticei
  );

  constructor(
    private toastr: ToastrService,
    private momenteArtisticeiService: MomenteArtisticeService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private tipMomenteArtisticeService: TipMomentArtisticService
  ) {}

  ngOnInit() {
    this.GetMomenteArtistice();
    this.GetTipMomenteArtistice();
    this.titleService.setTitle("faPaintBrush", "Momente artistice");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource(){
    this.dataSource = new MatTableDataSource(this.momenteArtisticei);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipMomenteArtistice() {
    this.tipMomenteArtisticeService
      .GetTipMomentArtistic()
      .subscribe((response: TipMomentArtistic[]) => {
        this.tipMomenteArtistice = response;
      });
  }

  GetMomenteArtistice() {
    this.loadingService.start();

    this.momenteArtisticeiService
      .GetMomenteArtistice()
      .subscribe((response: MomenteArtistice[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.momenteArtisticei = response;
        this.UpdateDataSource();
      });
  }

  DeleteMomenteArtistice(user: MomenteArtistice) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest moment artistic?',
      html: `Id: <b>${user.id_moment_artistic}</b> - Nume: <b>${user.nume_tip_moment_artistic}</b>
      <br>
      Tip momente artistic: <b>${user.nume_categorie_moment_artistic}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {

        this.loadingService.start();

        this.momenteArtisticeiService.DeleteMomenteArtistice(user.id_moment_artistic).subscribe(
          (response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Momentul artistic a fost sters.',
                icon: 'success'
              });
              this.GetMomenteArtistice();
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

  AddMomenteArtistice() {
    const dialogRef = this.dialog.open(AddEditMomenteArtisticeComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addMomenteArtistice,
        dropdown: this.tipMomenteArtistice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddMomenteArtisticeConfirm(result);
      }
    });
  }

  AddMomenteArtisticeConfirm(momenteArtistice: MomenteArtistice) {

    this.loadingService.start();

    this.momenteArtisticeiService.AddMomenteArtistice(momenteArtistice).subscribe(
      (response: MomenteArtistice) => {
        this.loadingService.stop();

        if (response.id_moment_artistic == -1){
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        }
        else
        {
          this.toastr.Toast.fire({
            title: "Momentul artistic a fost adaugat cu succes",
            icon: "success"
          });
          this.momenteArtisticei.push(response);
          this.UpdateDataSource();
        }
      }
    )

  }

  EditMomenteArtistice(item: MomenteArtistice){
    const dialogRef = this.dialog.open(AddEditMomenteArtisticeComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.tipMomenteArtistice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditMomenteArtisticeConfirm(result, item);
      }
    });
  }

  EditMomenteArtisticeConfirm(momenteArtistice: MomenteArtistice, old: MomenteArtistice) {

    this.loadingService.start();

    this.momenteArtisticeiService.UpdateMomenteArtistice(momenteArtistice, momenteArtistice.id_moment_artistic).subscribe(
      (response: MomenteArtistice) => {
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
            title: "Momentul artistic a fost editat cu succes",
            icon: "success"
          });
          let idxOld = this.momenteArtisticei.indexOf(old);
          this.momenteArtisticei[idxOld] = momenteArtistice;
          this.UpdateDataSource();
        }
      }
    )

  }
}
