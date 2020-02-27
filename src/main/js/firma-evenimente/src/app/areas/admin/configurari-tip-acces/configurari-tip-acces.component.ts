import { TipAcces } from 'src/app/Models/admin/tip-acces';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { ConfigurariTipAcces } from 'src/app/Models/admin/configurari-tip-acces';
import { ToastrService } from 'src/app/services/toastr.service';
import { ConfigurariTipAccesService } from './configurari-tip-acces.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { AddEditConfigurariTipAccesComponent } from './add-edit-configurari-tip-acces/add-edit-configurari-tip-acces.component';
import { TipAccesService } from '../tip-acces/tip-acces.service';

@Component({
  selector: 'app-configurari-tip-acces',
  templateUrl: './configurari-tip-acces.component.html',
  styleUrls: ['./configurari-tip-acces.component.scss']
})
export class ConfigurariTipAccesComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addConfigurariTipAcces: ConfigurariTipAcces;
  configurariTipAccesi: ConfigurariTipAcces[] = [];
  tipConfigurariTipAcces: TipAcces[] = [];
  displayedColumns: string[] = [
    'id_configurari_acces',
    'denumire_configurare_acces',
    'modalitate_acces',
    'cost_realizare',
    'actions'
  ];
  dataSource: MatTableDataSource<ConfigurariTipAcces> = new MatTableDataSource(
    this.configurariTipAccesi
  );

  constructor(
    private toastr: ToastrService,
    private configurariTipAccesiService: ConfigurariTipAccesService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private tipAccesService: TipAccesService
  ) {}

  ngOnInit() {
    this.GetConfigurariTipAcces();
    this.GetTipConfigurariTipAcces();
    this.titleService.setTitle('faDungeon', 'Configurari tip acces eveniment');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.configurariTipAccesi);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipConfigurariTipAcces() {
    this.tipAccesService.GetTipAcces().subscribe((response: TipAcces[]) => {
      this.tipConfigurariTipAcces = response;
    });
  }

  GetConfigurariTipAcces() {
    this.loadingService.start();

    this.configurariTipAccesiService
      .GetConfigurariTipAcces()
      .subscribe((response: ConfigurariTipAcces[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.configurariTipAccesi = response;
        this.UpdateDataSource();
      });
  }

  DeleteConfigurariTipAcces(user: ConfigurariTipAcces) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi aceasta configurare tip acces?',
      html: `Id: <b>${user.id_configurari_acces}</b> - Nume: <b>${user.denumire_configurare_acces}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.configurariTipAccesiService
          .DeleteConfigurariTipAcces(user.id_configurari_acces)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Configurare tip acces a fost stearsa.',
                icon: 'success'
              });
              this.GetConfigurariTipAcces();
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

  AddConfigurariTipAcces() {
    const dialogRef = this.dialog.open(AddEditConfigurariTipAccesComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addConfigurariTipAcces,
        dropdown: this.tipConfigurariTipAcces
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddConfigurariTipAccesConfirm(result);
      }
    });
  }

  AddConfigurariTipAccesConfirm(configurariTipAcces: ConfigurariTipAcces) {
    this.loadingService.start();

    this.configurariTipAccesiService
      .AddConfigurariTipAcces(configurariTipAcces)
      .subscribe((response: ConfigurariTipAcces) => {
        this.loadingService.stop();

        if (response.id_configurari_acces == -1) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Configurarea tip acces a fost adaugata cu succes',
            icon: 'success'
          });
          this.configurariTipAccesi.push(response);
          this.UpdateDataSource();
        }
      });
  }

  EditConfigurariTipAcces(item: ConfigurariTipAcces) {
    const dialogRef = this.dialog.open(AddEditConfigurariTipAccesComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.tipConfigurariTipAcces
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditConfigurariTipAccesConfirm(result, item);
      }
    });
  }

  EditConfigurariTipAccesConfirm(
    configurariTipAcces: ConfigurariTipAcces,
    old: ConfigurariTipAcces
  ) {
    this.loadingService.start();

    this.configurariTipAccesiService
      .UpdateConfigurariTipAcces(
        configurariTipAcces,
        configurariTipAcces.id_configurari_acces
      )
      .subscribe((response: ConfigurariTipAcces) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Configurarea tip acces a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.configurariTipAccesi.indexOf(old);
          this.configurariTipAccesi[idxOld] = configurariTipAcces;
          this.UpdateDataSource();
        }
      });
  }
}
