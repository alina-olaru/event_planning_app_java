import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { TipLocatie } from 'src/app/Models/admin/tip-locatie';
import { ToastrService } from 'src/app/services/toastr.service';
import { TipLocatieService } from './tip-locatie.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditTipLocatieComponent } from './add-edit-tip-locatie/add-edit-tip-locatie.component';

@Component({
  selector: 'app-tip-locatie',
  templateUrl: './tip-locatie.component.html',
  styleUrls: ['./tip-locatie.component.scss']
})
export class TipLocatieComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipLocatie: TipLocatie;
  tipLocatie: TipLocatie[] = [];
  displayedColumns: string[] = [
    'id_tip_locatie',
    'nume_categorie_locatie',
    'descriere',
    'imagine_tip_locatie_src',
    'actions'
  ];
  dataSource: MatTableDataSource<TipLocatie> = new MatTableDataSource(
    this.tipLocatie
  );

  constructor(
    private toastr: ToastrService,
    private tipLocatieService: TipLocatieService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.GetTipLocatie();
    this.titleService.setTitle('faMapMarkedAlt','Tip Locatie');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipLocatie);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipLocatie() {
    this.loadingService.start();

    this.tipLocatieService.GetTipLocatie().subscribe((response: TipLocatie[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: 'info',
          title: 'Nu exista date in baza de date!'
        });
      }

      this.tipLocatie = response;
      this.tipLocatie.forEach(e => {
        if (e.imagine_tip_locatie) {
          const objectURL = 'data:image/png;base64,' + e.imagine_tip_locatie;
          e.imagine_tip_locatie_src = this.sanitizer.bypassSecurityTrustResourceUrl(
            objectURL
          );
        }
      });
      this.UpdateDataSource();
    });
  }

  DeleteTipLocatie(tipLocatie: TipLocatie) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de locatie?',
      html: `Id: <b>${tipLocatie.id_tip_locatie}</b> - Nume: <b>${tipLocatie.nume_categorie_locatie}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipLocatieService
          .DeleteTipLocatie(tipLocatie.id_tip_locatie)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Tipul de locatie a fost sters.',
                icon: 'success'
              });
              this.GetTipLocatie();
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

  AddTipLocatie() {
    const dialogRef = this.dialog.open(AddEditTipLocatieComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addTipLocatie
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipLocatieConfirm(result);
      }
    });
  }

  AddTipLocatieConfirm(tipLocatie: TipLocatie) {
    this.loadingService.start();

    this.tipLocatieService.AddTipLocatie(tipLocatie).subscribe((response: TipLocatie) => {
      this.loadingService.stop();

      if (response.id_tip_locatie == -1) {
        this.toastr.Swal.fire(
          'Eroare!',
          'A aparut o eroare la adugare, incearca din nou!',
          'error'
        );
      } else {
        this.toastr.Toast.fire({
          title: 'Tipul de locatie a fost adaugat cu succes',
          icon: 'success'
        });
        this.tipLocatie.push(response);
        response.imagine_tip_locatie_src =
          'data:image/png;base64,' + response.imagine_tip_locatie;
        this.UpdateDataSource();
      }
    });
  }

  EditTipLocatie(item: TipLocatie) {
    const dialogRef = this.dialog.open(AddEditTipLocatieComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditTipLocatieConfirm(result, item);
      }
    });
  }

  EditTipLocatieConfirm(tipLocatie: TipLocatie, old: TipLocatie) {
    this.loadingService.start();

    this.tipLocatieService
      .UpdateTipLocatie(tipLocatie, tipLocatie.id_tip_locatie)
      .subscribe((response: TipLocatie) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Tipul de locatie a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.tipLocatie.indexOf(old);
          this.tipLocatie[idxOld] = tipLocatie;
          this.UpdateDataSource();
        }
      });
  }

}
