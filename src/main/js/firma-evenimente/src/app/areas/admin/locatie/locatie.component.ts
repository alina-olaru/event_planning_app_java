import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Locatie } from 'src/app/Models/admin/locatie';
import { SubLocatie } from 'src/app/Models/admin/sub-locatie';
import { ToastrService } from 'src/app/services/toastr.service';
import { LocatieService } from './locatie.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SubLocatieService } from '../sub-locatie/sub-locatie.service';
import { AddEditLocatieComponent } from './add-edit-locatie/add-edit-locatie.component';

@Component({
  selector: 'app-locatie',
  templateUrl: './locatie.component.html',
  styleUrls: ['./locatie.component.scss']
})
export class LocatieComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addLocatie: Locatie;
  locatie: Locatie[] = [];
  subLocatii: SubLocatie[] = [];
  displayedColumns: string[] = [
    'id_locatie',
    'nume_locatie',
    'nume_categorie_tip_locatie',
    'tara',
    'oras',
    'adresa',
    'strada',
    'dimensiune_mp',
    'capacitate_maxima',
    'pret_inchiriere_per_24h',
    'imagine_locatie_src',
    'actions'
  ];
  dataSource: MatTableDataSource<Locatie> = new MatTableDataSource(
    this.locatie
  );

  constructor(
    private toastr: ToastrService,
    private locatieService: LocatieService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    private subLocatieService: SubLocatieService
  ) {}

  ngOnInit() {
    this.GetLocatie();
    this.GetSubLocatie();
    this.titleService.setTitle('faMapPin', 'Locatii');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.locatie);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetSubLocatie() {
    this.subLocatieService.GetSubLocatie().subscribe(response => {
      this.subLocatii = response;
    });
  }

  GetLocatie() {
    this.loadingService.start();

    this.locatieService
      .GetLocatie()
      .subscribe((response: Locatie[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.locatie = response;
        this.locatie.forEach(e => {
          if (e.imagine_locatie) {
            const objectURL = 'data:image/png;base64,' + e.imagine_locatie;
            e.imagine_locatie_src = this.sanitizer.bypassSecurityTrustResourceUrl(
              objectURL
            );
          }
        });
        this.UpdateDataSource();
      });
  }

  DeleteLocatie(locatie: Locatie) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi aceasta locatie?',
      html: `Id: <b>${locatie.id_locatie}</b> - Nume: <b>${locatie.nume_locatie}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.locatieService
          .DeleteLocatie(locatie.id_locatie)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Locatia a fost stearsa.',
                icon: 'success'
              });
              this.GetLocatie();
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

  AddLocatie() {
    const dialogRef = this.dialog.open(AddEditLocatieComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addLocatie,
        dropdown: this.subLocatii
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddLocatieConfirm(result);
      }
    });
  }

  AddLocatieConfirm(locatie: Locatie) {
    this.loadingService.start();

    this.locatieService
      .AddLocatie(locatie)
      .subscribe((response: Locatie) => {
        this.loadingService.stop();

        if (response.id_locatie == -1) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Locatia a fost adaugata cu succes',
            icon: 'success'
          });
          this.locatie.push(response);
          if (response.imagine_locatie) {
            response.imagine_locatie_src =
              'data:image/png;base64,' + response.imagine_locatie;
          }
          this.UpdateDataSource();
        }
      });
  }

  EditLocatie(item: Locatie) {
    const dialogRef = this.dialog.open(AddEditLocatieComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.subLocatii
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditLocatieConfirm(result, item);
      }
    });
  }

  EditLocatieConfirm(locatie: Locatie, old: Locatie) {
    this.loadingService.start();

    this.locatieService
      .UpdateLocatie(locatie, locatie.id_locatie)
      .subscribe((response: Locatie) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Locatia a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.locatie.indexOf(old);
          this.locatie[idxOld] = locatie;
          this.UpdateDataSource();
        }
      });
  }
}
