import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { TipAcces } from "src/app/Models/admin/tip-acces";
import { ToastrService } from "src/app/services/toastr.service";
import { TipAccesService } from "./tip-acces.service";
import { LoadingService } from "src/app/modules/loading-spinner/loading.service";
import { TitleService } from "../services/title.service";
import { AddEditTipAccesComponent } from "./add-edit-tip-acces/add-edit-tip-acces.component";

@Component({
  selector: "app-tip-acces",
  templateUrl: "./tip-acces.component.html",
  styleUrls: ["./tip-acces.component.scss"]
})
export class TipAccesComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  _addTipUser: TipAcces;
  tipAccesi: TipAcces[] = [];
  displayedColumns: string[] = ["id_acces", "modalitate_acces", "actions"];
  dataSource: MatTableDataSource<TipAcces> = new MatTableDataSource(
    this.tipAccesi
  );

  constructor(
    private toastr: ToastrService,
    private tipAccesiService: TipAccesService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.GetTipAcces();
    this.titleService.setTitle("faTicketAlt", "Tip acces eveniment");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.tipAccesi);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetTipAcces() {
    this.loadingService.start();

    this.tipAccesiService.GetTipAcces().subscribe((response: TipAcces[]) => {
      this.loadingService.stop();

      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: "info",
          title: "Nu exista date in baza de date!"
        });
      }

      this.tipAccesi = response;
      this.UpdateDataSource();
    });
  }

  DeleteTipAcces(user: TipAcces) {
    this.toastr.Swal.fire({
      title: "Esti sigur ca vrei sa stergi acest tip de acces?",
      html: `Tip acces: <b>${user.modalitate_acces}</b>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Da",
      cancelButtonText: "Nu"
    }).then(result => {
      if (result.value) {
        this.loadingService.start();

        this.tipAccesiService
          .DeleteTipAcces(user.id_acces)
          .subscribe((response: boolean) => {
            this.loadingService.stop();
            if (response == true) {
              this.toastr.Toast.fire({
                title: "Tipul de acces a fost sters.",
                icon: "success"
              });
              this.GetTipAcces();
            } else {
              this.toastr.Swal.fire(
                "Eroare!",
                "A aparut o eroare la stergere, incearca din nou!",
                "error"
              );
            }
          });
      }
    });
  }

  AddTipAcces() {
    const dialogRef = this.dialog.open(AddEditTipAccesComponent, {
      width: "400px",
      data: {
        type: "add",
        model: this._addTipUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.AddTipAccesConfirm(result.model);
      }
    });
  }

  AddTipAccesConfirm(tipAcces: TipAcces) {
    if (tipAcces.modalitate_acces) {
      this.loadingService.start();

      this.tipAccesiService
        .AddTipAcces(tipAcces)
        .subscribe((response: TipAcces) => {
          this.loadingService.stop();

          if (response.id_acces == -1) {
            this.toastr.Swal.fire(
              "Eroare!",
              "A aparut o eroare la adugare, incearca din nou!",
              "error"
            );
          } else {
            this.toastr.Toast.fire({
              title: "Tipul de acces a fost adaugat cu succes",
              icon: "success"
            });
            this.tipAccesi.push(response);
            this.UpdateDataSource();
          }
        });
    }else{
      this.toastr.Toast.fire({
        icon: "warning",
        title: "Trebuie completata modalitatea de acces!"
      })
    }
  }
}
