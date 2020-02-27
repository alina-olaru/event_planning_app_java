import { TipMeniuService } from './../tip-meniu/tip-meniu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ComponentaMeniu } from 'src/app/Models/admin/componenta-meniu';
import { TipMomentArtistic } from 'src/app/Models/admin/tip-moment-artistic';
import { ToastrService } from 'src/app/services/toastr.service';
import { ComponentaMeniuService } from './componenta-meniu.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { TipMomentArtisticService } from '../tip-moment-artistic/tip-moment-artistic.service';
import { AddEditComponentaMeniuComponent } from './add-edit-componenta-meniu/add-edit-componenta-meniu.component';
import { TipMeniu } from 'src/app/Models/admin/tip-meniu';

@Component({
  selector: 'app-componenta-meniu',
  templateUrl: './componenta-meniu.component.html',
  styleUrls: ['./componenta-meniu.component.scss']
})
export class ComponentaMeniuComponent implements OnInit {


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addComponentaMeniu: ComponentaMeniu;
  componentaMeniui: ComponentaMeniu[] = [];
  tipComponentaMeniu: TipMeniu[]=[];
  displayedColumns: string[] = ['id_preparat',
  'nume_preparat',
  'nume_meniu',
  'cantitate',
  'alergeni',
  'actions'];
  dataSource: MatTableDataSource<ComponentaMeniu> = new MatTableDataSource(
    this.componentaMeniui
  );

  constructor(
    private toastr: ToastrService,
    private componentaMeniuiService: ComponentaMeniuService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private tipComponentaMeniuService: TipMeniuService
  ) {}

  ngOnInit() {
    this.GetComponentaMeniu();
    this.GetTipComponentaMeniu();
    this.titleService.setTitle("faPaintBrush", "Momente artistice");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource(){
    this.dataSource = new MatTableDataSource(this.componentaMeniui);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipComponentaMeniu() {
    this.tipComponentaMeniuService
      .GetTipMeniu()
      .subscribe((response: TipMeniu[]) => {
        this.tipComponentaMeniu = response;
      });
  }

  GetComponentaMeniu() {
    this.loadingService.start();

    this.componentaMeniuiService
      .GetComponentaMeniu()
      .subscribe((response: ComponentaMeniu[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.componentaMeniui = response;
        this.UpdateDataSource();
      });
  }

  DeleteComponentaMeniu(user: ComponentaMeniu) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi aceasta componenta meniu?',
      html: `Id: <b>${user.id_preparat}</b> - Nume: <b>${user.nume_preparat}</b>
      <br>
      Tip meniu: <b>${user.nume_meniu}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {

        this.loadingService.start();

        this.componentaMeniuiService.DeleteComponentaMeniu(user.id_preparat).subscribe(
          (response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Componenta meniu a fost stearsa.',
                icon: 'success'
              });
              this.GetComponentaMeniu();
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

  AddComponentaMeniu() {
    const dialogRef = this.dialog.open(AddEditComponentaMeniuComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addComponentaMeniu,
        dropdown: this.tipComponentaMeniu
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddComponentaMeniuConfirm(result);
      }
    });
  }

  AddComponentaMeniuConfirm(componentaMeniu: ComponentaMeniu) {

    this.loadingService.start();

    this.componentaMeniuiService.AddComponentaMeniu(componentaMeniu).subscribe(
      (response: ComponentaMeniu) => {
        this.loadingService.stop();

        if (response.id_preparat == -1){
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        }
        else
        {
          this.toastr.Toast.fire({
            title: "Componenta meniu a fost adaugata cu succes",
            icon: "success"
          });
          this.componentaMeniui.push(response);
          this.UpdateDataSource();
        }
      }
    )

  }

  EditComponentaMeniu(item: ComponentaMeniu){
    const dialogRef = this.dialog.open(AddEditComponentaMeniuComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.tipComponentaMeniu
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditComponentaMeniuConfirm(result, item);
      }
    });
  }

  EditComponentaMeniuConfirm(componentaMeniu: ComponentaMeniu, old: ComponentaMeniu) {

    this.loadingService.start();

    this.componentaMeniuiService.UpdateComponentaMeniu(componentaMeniu, componentaMeniu.id_preparat).subscribe(
      (response: ComponentaMeniu) => {
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
            title: "Componenta meniu a fost editata cu succes",
            icon: "success"
          });
          let idxOld = this.componentaMeniui.indexOf(old);
          this.componentaMeniui[idxOld] = componentaMeniu;
          this.UpdateDataSource();
        }
      }
    )

  }

}
