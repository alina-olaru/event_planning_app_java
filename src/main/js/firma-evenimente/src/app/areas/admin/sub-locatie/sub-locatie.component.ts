import { TipLocatie } from 'src/app/Models/admin/tip-locatie';
import { TipLocatieService } from './../tip-locatie/tip-locatie.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { SubLocatie } from 'src/app/Models/admin/sub-locatie';
import { ToastrService } from 'src/app/services/toastr.service';
import { SubLocatieService } from './sub-locatie.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditSubLocatieComponent } from './add-edit-sub-locatie/add-edit-sub-locatie.component';

@Component({
  selector: 'app-sub-locatie',
  templateUrl: './sub-locatie.component.html',
  styleUrls: ['./sub-locatie.component.scss']
})
export class SubLocatieComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addSubLocatie: SubLocatie;
  subLocatie: SubLocatie[] = [];
  tipuriLocatie: TipLocatie[] = [];
  displayedColumns: string[] = [
    'id_sub_locatie',
    'nume_categorie_tip_locatie',
    'nume_tip_locatie',
    'anotimp_potrivit',
    'imagine_sub_locatie_src',
    'actions'
  ];
  dataSource: MatTableDataSource<SubLocatie> = new MatTableDataSource(
    this.subLocatie
  );

  constructor(
    private toastr: ToastrService,
    private subLocatieService: SubLocatieService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    private tipLocatieService: TipLocatieService
  ) {}

  ngOnInit() {
    this.GetSubLocatie();
    this.GetTipLocatie();
    this.titleService.setTitle('faGlobeEurope', 'Sub Locatie');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.subLocatie);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipLocatie() {
    this.tipLocatieService.GetTipLocatie().subscribe(response => {
      this.tipuriLocatie = response;
    });
  }

  GetSubLocatie() {
    this.loadingService.start();

    this.subLocatieService
      .GetSubLocatie()
      .subscribe((response: SubLocatie[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.subLocatie = response;
        this.subLocatie.forEach(e => {
          if (e.imagine_sub_locatie) {
            const objectURL = 'data:image/png;base64,' + e.imagine_sub_locatie;
            e.imagine_sub_locatie_src = this.sanitizer.bypassSecurityTrustResourceUrl(
              objectURL
            );
          }
        });
        this.UpdateDataSource();
      });
  }

  DeleteSubLocatie(subLocatie: SubLocatie) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi aceasta sub-locatie?',
      html: `Id: <b>${subLocatie.id_sub_locatie}</b> - Nume: <b>${subLocatie.nume_categorie_tip_locatie}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.subLocatieService
          .DeleteSubLocatie(subLocatie.id_sub_locatie)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Sub-locatia a fost stearsa.',
                icon: 'success'
              });
              this.GetSubLocatie();
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

  AddSubLocatie() {
    const dialogRef = this.dialog.open(AddEditSubLocatieComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addSubLocatie,
        dropdown: this.tipuriLocatie
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddSubLocatieConfirm(result);
      }
    });
  }

  AddSubLocatieConfirm(subLocatie: SubLocatie) {
    this.loadingService.start();

    this.subLocatieService
      .AddSubLocatie(subLocatie)
      .subscribe((response: SubLocatie) => {
        this.loadingService.stop();

        if (response.id_tip_locatie == -1) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Sub-locatia a fost adaugata cu succes',
            icon: 'success'
          });
          this.subLocatie.push(response);
          if (response.imagine_sub_locatie) {
            response.imagine_sub_locatie_src =
              'data:image/png;base64,' + response.imagine_sub_locatie;
          }
          this.UpdateDataSource();
        }
      });
  }

  EditSubLocatie(item: SubLocatie) {
    const dialogRef = this.dialog.open(AddEditSubLocatieComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.tipuriLocatie
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditSubLocatieConfirm(result, item);
      }
    });
  }

  EditSubLocatieConfirm(subLocatie: SubLocatie, old: SubLocatie) {
    this.loadingService.start();

    this.subLocatieService
      .UpdateSubLocatie(subLocatie, subLocatie.id_tip_locatie)
      .subscribe((response: SubLocatie) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Sub-locatia a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.subLocatie.indexOf(old);
          this.subLocatie[idxOld] = subLocatie;
          this.UpdateDataSource();
        }
      });
  }
}
