import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TipLocatieSubEveniment } from 'src/app/Models/admin/tip-locatie-sub-eveniment';
import { TipLocatie } from 'src/app/Models/admin/tip-locatie';
import { SubTipEveniment } from 'src/app/Models/admin/sub-tip-eveniment';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipLocatieSubEvenimentService } from './tip-locatie-sub-eveniment.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { TipLocatieService } from '../tip-locatie/tip-locatie.service';
import { SubTipEvenimentService } from '../sub-tip-eveniment/sub-tip-eveniment.service';
import { AddEditTipLocatieSubEvenimentComponent } from './add-edit-tip-locatie-sub-eveniment/add-edit-tip-locatie-sub-eveniment.component';

@Component({
  selector: 'app-tip-locatie-sub-eveniment',
  templateUrl: './tip-locatie-sub-eveniment.component.html',
  styleUrls: ['./tip-locatie-sub-eveniment.component.scss']
})
export class TipLocatieSubEvenimentComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipUser: TipLocatieSubEveniment;
  tipLocatieSubEvenimenti: TipLocatieSubEveniment[] = [];
  tipLocatie: TipLocatie[] = [];
  tipSubEveniment: SubTipEveniment[] = [];
  displayedColumns: string[] = [
    'id_sub_eveniment',
    'nume_categorie_sub_eveniment',
    'id_tip_locatie',
    'nume_categorie_locatie',
    'actions'
  ];
  dataSource: MatTableDataSource<TipLocatieSubEveniment> = new MatTableDataSource(
    this.tipLocatieSubEvenimenti
  );

  constructor(
    private toastr: ToastrService,
    private tipLocatieSubEvenimentiService: TipLocatieSubEvenimentService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private tipLocatieService: TipLocatieService,
    private subTipEvenimentService: SubTipEvenimentService
  ) {}

  ngOnInit() {
    this.GetTipLocatieSubEveniment();
    this.GetTipLocatie();
    this.GetSubEvenimente();
    this.titleService.setTitle('faListAlt', 'Tip locatie sub-eveniment');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipLocatieSubEvenimenti);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipLocatie() {
    this.tipLocatieService.GetTipLocatie().subscribe(response => {
      this.tipLocatie = response;
    });
  }

  GetSubEvenimente() {
    this.subTipEvenimentService.GetSubTipEveniment().subscribe(response => {
      this.tipSubEveniment = response;
    });
  }

  GetTipLocatieSubEveniment() {
    this.loadingService.start();

    this.tipLocatieSubEvenimentiService
      .GetTipLocatieSubEvenimenti()
      .subscribe((response: TipLocatieSubEveniment[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.tipLocatieSubEvenimenti = response;
        this.UpdateDataSource();
      });
  }

  DeleteTipLocatieSubEveniment(user: TipLocatieSubEveniment) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi aceasta intrare?',
      html: `Tip eveniment: <b>${user.nume_categorie_sub_eveniment} (${user.id_sub_eveniment})</b> -
      Tip locatie: <b>${user.nume_categorie_locatie} (${user.id_tip_locatie})</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipLocatieSubEvenimentiService
          .DeleteTipLocatieSubEvenimenti(user.id_sub_eveniment, user.id_tip_locatie)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de locatie pentru sub-eveniment a fost sters.',
                icon: 'success'
              });
              this.GetTipLocatieSubEveniment();
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

  AddTipLocatieSubEveniment() {
    const dialogRef = this.dialog.open(AddEditTipLocatieSubEvenimentComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipUser,
        first: this.tipLocatie,
        second: this.tipSubEveniment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipLocatieSubEvenimentConfirm(result);
      }
    });
  }

  AddTipLocatieSubEvenimentConfirm(tipLocatieSubEveniment: TipLocatieSubEveniment) {
    this.loadingService.start();

    this.tipLocatieSubEvenimentiService
      .AddTipLocatieSubEveniment(tipLocatieSubEveniment)
      .subscribe((response: TipLocatieSubEveniment) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de locatie pentru sub-eveniment a fost adaugat cu succes',
            icon: 'success'
          });
          this.tipLocatieSubEvenimenti.push(response);
          this.UpdateDataSource();
        }
      }, (error) => {
        this.loadingService.stop();
        this.toastr.Toast.fire({
          title: 'Tipul de locatie pentru sub-eveniment exista deja!',
          icon: 'warning'
        });
      });
  }
}
