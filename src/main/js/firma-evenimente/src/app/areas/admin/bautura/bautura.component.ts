import { AddEditBauturaComponent } from './add-edit-bautura/add-edit-bautura.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { Bautura } from 'src/app/Models/admin/bautura';
import { ToastrService } from 'src/app/services/toastr.service';
import { BauturaService } from '../bautura/bautura.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bautura',
  templateUrl: './bautura.component.html',
  styleUrls: ['./bautura.component.scss']
})
export class BauturaComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addBautura: Bautura;
  bautura: Bautura[] = [];
  displayedColumns: string[] = [
    'id_bautura',
    'pret_pret_bucata',
    'pret_per_bax',
    'nume_bautura',
    'gramaj',
    'imagine_bautura_src',
    'actions'
  ];
  dataSource: MatTableDataSource<Bautura> = new MatTableDataSource(
    this.bautura
  );

  constructor(
    private toastr: ToastrService,
    private bauturaService: BauturaService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.GetBautura();
    this.titleService.setTitle('faGlassCheers', 'Bautura');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.bautura);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetBautura() {
    this.loadingService.start();

    this.bauturaService.GetBautura().subscribe((response: Bautura[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: 'info',
          title: 'Nu exista date in baza de date!'
        });
      }

      this.bautura = response;
      this.bautura.forEach(e => {
        if (e.imagine_bautura) {
          const objectURL = 'data:image/png;base64,' + e.imagine_bautura;
          e.imagine_bautura_src = this.sanitizer.bypassSecurityTrustResourceUrl(
            objectURL
          );
        }
      });
      this.UpdateDataSource();
    });
  }

  DeleteBautura(bautura: Bautura) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest bautura?',
      html: `Id: <b>${bautura.id_bautura}</b> - Nume: <b>${bautura.nume_bautura}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.bauturaService
          .DeleteBautura(bautura.id_bautura)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Bauturaul a fost sters.',
                icon: 'success'
              });
              this.GetBautura();
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

  AddBautura() {
    const dialogRef = this.dialog.open(AddEditBauturaComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addBautura
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddBauturaConfirm(result);
      }
    });
  }

  AddBauturaConfirm(bautura: Bautura) {
    this.loadingService.start();

    this.bauturaService.AddBautura(bautura).subscribe((response: Bautura) => {
      this.loadingService.stop();

      if (response.id_bautura == -1) {
        this.toastr.Swal.fire(
          'Eroare!',
          'A aparut o eroare la adugare, incearca din nou!',
          'error'
        );
      } else {
        this.toastr.Toast.fire({
          title: 'Bautura a fost adaugat cu succes',
          icon: 'success'
        });
        this.bautura.push(response);
        response.imagine_bautura_src =
          'data:image/png;base64,' + response.imagine_bautura;
        this.UpdateDataSource();
      }
    });
  }

  EditBautura(item: Bautura) {
    const dialogRef = this.dialog.open(AddEditBauturaComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditBauturaConfirm(result, item);
      }
    });
  }

  EditBauturaConfirm(bautura: Bautura, old: Bautura) {
    this.loadingService.start();

    this.bauturaService
      .UpdateBautura(bautura, bautura.id_bautura)
      .subscribe((response: Bautura) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Bautura a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.bautura.indexOf(old);
          this.bautura[idxOld] = bautura;
          this.UpdateDataSource();
        }
      });
  }
}
