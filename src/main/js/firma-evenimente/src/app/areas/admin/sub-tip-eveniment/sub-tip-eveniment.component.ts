import { TipEveniment } from './../../../Models/admin/tip-eveniment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SubTipEveniment } from 'src/app/Models/admin/sub-tip-eveniment';
import { TipLocatie } from 'src/app/Models/admin/tip-locatie';
import { ToastrService } from 'src/app/services/toastr.service';
import { SubTipEvenimentService } from './sub-tip-eveniment.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TipLocatieService } from '../tip-locatie/tip-locatie.service';
import { AddEditSubTipEvenimentComponent } from './add-edit-sub-tip-eveniment/add-edit-sub-tip-eveniment.component';
import { TipEvenimentService } from '../tip-eveniment/tip-eveniment.service';

@Component({
  selector: 'app-sub-tip-eveniment',
  templateUrl: './sub-tip-eveniment.component.html',
  styleUrls: ['./sub-tip-eveniment.component.scss']
})
export class SubTipEvenimentComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addSubTipEveniment: SubTipEveniment;
  subTipEveniment: SubTipEveniment[] = [];
  tipuriLocatie: TipEveniment[] = [];
  displayedColumns: string[] = [
    'id_sub_eveniment',
    'nume_categorie_sub_eveniment',
    'nume_categorie_eveniment',
    'numar_evenimente_organizate_per_sub_eveniment',
    'descriere',
    'imagine_sub_eveniment_src',
    'actions'
  ];
  dataSource: MatTableDataSource<SubTipEveniment> = new MatTableDataSource(
    this.subTipEveniment
  );

  constructor(
    private toastr: ToastrService,
    private subTipEvenimentService: SubTipEvenimentService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    private tipLocatieService: TipEvenimentService
  ) {}

  ngOnInit() {
    this.GetSubTipEveniment();
    this.GetTipEveniment();
    this.titleService.setTitle('faGlassMartini', 'Sub-eveniment');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.subTipEveniment);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipEveniment() {
    this.tipLocatieService.GetTipEveniment().subscribe(response => {
      this.tipuriLocatie = response;
    });
  }

  GetSubTipEveniment() {
    this.loadingService.start();

    this.subTipEvenimentService
      .GetSubTipEveniment()
      .subscribe((response: SubTipEveniment[]) => {
        this.loadingService.stop();

        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: 'info',
            title: 'Nu exista date in baza de date!'
          });
        }

        this.subTipEveniment = response;
        this.subTipEveniment.forEach(e => {
          if (e.imagine_sub_eveniment) {
            const objectURL = 'data:image/png;base64,' + e.imagine_sub_eveniment;
            e.imagine_sub_eveniment_src = this.sanitizer.bypassSecurityTrustResourceUrl(
              objectURL
            );
          }
        });
        this.UpdateDataSource();
      });
  }

  DeleteSubTipEveniment(subTipEveniment: SubTipEveniment) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest tip de sub-eveniment?',
      html: `Id: <b>${subTipEveniment.id_sub_eveniment}</b> - Nume: <b>${subTipEveniment.nume_categorie_sub_eveniment}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.subTipEvenimentService
          .DeleteSubTipEveniment(subTipEveniment.id_sub_eveniment)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Sub-evenimentul a fost sters.',
                icon: 'success'
              });
              this.GetSubTipEveniment();
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

  AddSubTipEveniment() {
    const dialogRef = this.dialog.open(AddEditSubTipEvenimentComponent, {
      width: '400px',
      data: {
        type: 'add',
        model: this._addSubTipEveniment,
        dropdown: this.tipuriLocatie
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddSubTipEvenimentConfirm(result);
      }
    });
  }

  AddSubTipEvenimentConfirm(subTipEveniment: SubTipEveniment) {
    this.loadingService.start();

    this.subTipEvenimentService
      .AddSubTipEveniment(subTipEveniment)
      .subscribe((response: SubTipEveniment) => {
        this.loadingService.stop();

        if (response.id_sub_eveniment == -1) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Sub-evenimentul a fost adaugat cu succes',
            icon: 'success'
          });
          this.subTipEveniment.push(response);
          if (response.imagine_sub_eveniment) {
            response.imagine_sub_eveniment_src =
              'data:image/png;base64,' + response.imagine_sub_eveniment;
          }
          this.UpdateDataSource();
        }
      });
  }

  EditSubTipEveniment(item: SubTipEveniment) {
    const dialogRef = this.dialog.open(AddEditSubTipEvenimentComponent, {
      width: '400px',
      data: {
        type: 'edit',
        model: Object.assign({}, item),
        dropdown: this.tipuriLocatie
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditSubTipEvenimentConfirm(result, item);
      }
    });
  }

  EditSubTipEvenimentConfirm(subTipEveniment: SubTipEveniment, old: SubTipEveniment) {
    this.loadingService.start();

    this.subTipEvenimentService
      .UpdateSubTipEveniment(subTipEveniment, subTipEveniment.id_sub_eveniment)
      .subscribe((response: SubTipEveniment) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Sub-evenimentul a fost editat cu succes',
            icon: 'success'
          });
          const idxOld = this.subTipEveniment.indexOf(old);
          this.subTipEveniment[idxOld] = subTipEveniment;
          this.UpdateDataSource();
        }
      });
  }

}
