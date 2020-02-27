import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ElementeDesign } from 'src/app/Models/admin/elemente-design';
import { ToastrService } from 'src/app/services/toastr.service';
import { ElementeDesignService } from './elemente-design.service';
import { LoadingService } from 'src/app/modules/loading-spinner/loading.service';
import { TitleService } from '../services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditElementeDesignComponent } from './add-edit-elemente-design/add-edit-elemente-design.component';

@Component({
  selector: 'app-elemente-design',
  templateUrl: './elemente-design.component.html',
  styleUrls: ['./elemente-design.component.scss']
})
export class ElementeDesignComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addElementeDesign: ElementeDesign;
  elementeDesign: ElementeDesign[] = [];
  displayedColumns: string[] = [
    'id_element_design',
    'nume_element',
    'culoare',
    'cantitate',
    'dimensiuni',
    'pret_per_element',
    'discount',
    'numar_minim_elemente_pentru_reducere',
    'imagine_element_design_src',
    'actions'
  ];
  dataSource: MatTableDataSource<ElementeDesign> = new MatTableDataSource(
    this.elementeDesign
  );

  constructor(
    private toastr: ToastrService,
    private elementeDesignService: ElementeDesignService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.GetElementeDesign();
    this.titleService.setTitle('faUmbrellaBeach', 'Elemente design');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.elementeDesign);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetElementeDesign() {
    this.loadingService.start();

    this.elementeDesignService.GetElementeDesign().subscribe((response: ElementeDesign[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: 'info',
          title: 'Nu exista date in baza de date!'
        });
      }

      this.elementeDesign = response;
      this.elementeDesign.forEach(e => {
        if (e.imagine_element_design) {
          const objectURL = 'data:image/png;base64,' + e.imagine_element_design;
          e.imagine_element_design_src = this.sanitizer.bypassSecurityTrustResourceUrl(
            objectURL
          );
        }
      });
      this.UpdateDataSource();
    });
  }

  DeleteElementeDesign(elementeDesign: ElementeDesign) {
    this.toastr.Swal.fire({
      title: 'Esti sigur ca vrei sa stergi acest element de design?',
      html: `Id: <b>${elementeDesign.id_element_design}</b> - Nume: <b>${elementeDesign.nume_element}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da',
      cancelButtonText: 'Nu'
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.elementeDesignService
          .DeleteElementeDesign(elementeDesign.id_element_design)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: 'Elementul de design a fost sters.',
                icon: 'success'
              });
              this.GetElementeDesign();
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

  AddElementeDesign() {
    const dialogRef = this.dialog.open(AddEditElementeDesignComponent, {
      width: '450px',
      data: {
        type: 'add',
        model: this._addElementeDesign
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddElementeDesignConfirm(result);
      }
    });
  }

  AddElementeDesignConfirm(elementeDesign: ElementeDesign) {
    this.loadingService.start();

    this.elementeDesignService.AddElementeDesign(elementeDesign).subscribe((response: ElementeDesign) => {
      this.loadingService.stop();

      if (response.id_element_design == -1) {
        this.toastr.Swal.fire(
          'Eroare!',
          'A aparut o eroare la adugare, incearca din nou!',
          'error'
        );
      } else {
        this.toastr.Toast.fire({
          title: 'Elementul de design a fost adaugat cu succes',
          icon: 'success'
        });
        this.elementeDesign.push(response);
        response.imagine_element_design_src =
          'data:image/png;base64,' + response.imagine_element_design;
        this.UpdateDataSource();
      }
    });
  }

  EditElementeDesign(item: ElementeDesign) {
    const dialogRef = this.dialog.open(AddEditElementeDesignComponent, {
      width: '450px',
      data: {
        type: 'edit',
        model: Object.assign({}, item)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.EditElementeDesignConfirm(result, item);
      }
    });
  }

  EditElementeDesignConfirm(elementeDesign: ElementeDesign, old: ElementeDesign) {
    this.loadingService.start();

    this.elementeDesignService
      .UpdateElementeDesign(elementeDesign, elementeDesign.id_element_design)
      .subscribe((response: ElementeDesign) => {
        this.loadingService.stop();

        if (response == null) {
          this.toastr.Swal.fire(
            'Eroare!',
            'A aparut o eroare la adugare, incearca din nou!',
            'error'
          );
        } else {
          this.toastr.Toast.fire({
            title: 'Elementul de design a fost editata cu succes',
            icon: 'success'
          });
          const idxOld = this.elementeDesign.indexOf(old);
          this.elementeDesign[idxOld] = elementeDesign;
          this.UpdateDataSource();
        }
      });
  }

}
