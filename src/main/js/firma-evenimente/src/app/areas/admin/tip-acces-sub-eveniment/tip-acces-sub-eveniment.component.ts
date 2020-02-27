import { SubTipEvenimentService } from './../sub-tip-eveniment/sub-tip-eveniment.service';
import { TipAccesService } from './../tip-acces/tip-acces.service';
import { SubTipEveniment } from 'src/app/Models/admin/sub-tip-eveniment';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { TipAccesSubEveniment } from 'src/app/Models/admin/tip-acces-sub-eveniment';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipAccesSubEvenimentService } from './tip-acces-sub-eveniment.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { AddEditTipAccesSubEvenimentComponent } from './add-edit-tip-acces-sub-eveniment/add-edit-tip-acces-sub-eveniment.component';
import { TipAcces } from 'src/app/Models/admin/tip-acces';

@Component({
  selector: 'app-tip-acces-sub-eveniment',
  templateUrl: './tip-acces-sub-eveniment.component.html',
  styleUrls: ['./tip-acces-sub-eveniment.component.scss']
})
export class TipAccesSubEvenimentComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipUser: TipAccesSubEveniment;
  tipAccesSubEvenimenti: TipAccesSubEveniment[] = [];
  tipAcces: TipAcces[] = [];
  tipSubEveniment: SubTipEveniment[] = [];
  displayedColumns: string[] = [
    'id_sub_eveniment',
    'nume_categorie_sub_eveniment',
    'id_acces',
    'modalitate_acces',
    'actions'
  ];
  dataSource: MatTableDataSource<TipAccesSubEveniment> = new MatTableDataSource(
    this.tipAccesSubEvenimenti
  );

  constructor(
    private toastr: ToastrService,
    private tipAccesSubEvenimentiService: TipAccesSubEvenimentService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private tipAccesService: TipAccesService,
    private subTipEvenimentService: SubTipEvenimentService
  ) {}

  ngOnInit() {
    this.GetTipAccesSubEveniment();
    this.GetTipAcces();
    this.GetSubEvenimente();
    this.titleService.setTitle('faListAlt', 'Tip acces sub-eveniment');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipAccesSubEvenimenti);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipAcces() {
    this.tipAccesService.GetTipAcces().subscribe(response => {
      this.tipAcces = response;
    });
  }

  GetSubEvenimente() {
    this.subTipEvenimentService.GetSubTipEveniment().subscribe(response => {
      this.tipSubEveniment = response;
    });
  }

  GetTipAccesSubEveniment() {
    this.loadingService.start();

    this.tipAccesSubEvenimentiService
      .GetTipAccesSubEvenimenti()
      .subscribe((response: TipAccesSubEveniment[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.tipAccesSubEvenimenti = response;
        this.UpdateDataSource();
      });
  }

  DeleteTipAccesSubEveniment(user: TipAccesSubEveniment) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi aceasta intrare?',
      html: `Tip eveniment: <b>${user.nume_categorie_sub_eveniment} (${user.id_sub_eveniment})</b> -
      Tip acces: <b>${user.modalitate_acces} (${user.id_acces})</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipAccesSubEvenimentiService
          .DeleteTipAccesSubEvenimenti(user.id_sub_eveniment, user.id_acces)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de acces pentru sub-eveniment a fost sters.',
                icon: 'success'
              });
              this.GetTipAccesSubEveniment();
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

  AddTipAccesSubEveniment() {
    const dialogRef = this.dialog.open(AddEditTipAccesSubEvenimentComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipUser,
        first: this.tipAcces,
        second: this.tipSubEveniment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipAccesSubEvenimentConfirm(result);
      }
    });
  }

  AddTipAccesSubEvenimentConfirm(tipAccesSubEveniment: TipAccesSubEveniment) {
    this.loadingService.start();

    this.tipAccesSubEvenimentiService
      .AddTipAccesSubEveniment(tipAccesSubEveniment)
      .subscribe((response: TipAccesSubEveniment) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de acces pentru sub-eveniment a fost adaugat cu succes',
            icon: 'success'
          });
          this.tipAccesSubEvenimenti.push(response);
          this.UpdateDataSource();
        }
      }, (error) => {
        this.loadingService.stop();
        this.toastr.Toast.fire({
          title: 'Tipul de acces pentru sub-eveniment exista deja!',
          icon: 'warning'
        });
      });
  }
}
