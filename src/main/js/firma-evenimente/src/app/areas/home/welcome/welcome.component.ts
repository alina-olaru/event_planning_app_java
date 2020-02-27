import { TopHome } from './../../../Models/home/top-home';
import { HomeEveniment } from "./../../../Models/home/home-eveniment";
import { LoginService } from "./../../login/login.service";
import { WelcomeService } from "./welcome.service";
import { LoadingService } from "./../../../modules/loading-spinner/loading.service";
import { ToastrService } from "./../../../services/toastr.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  minValueFilter: number = 0;
  maxValueFilter: number = null;

  minimEvenimenteCreate: number = 2;
  top: TopHome[]=[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  evenimente: HomeEveniment[] = [];
  displayedColumns: string[] = [
    "id_eveniment",
    "data_inceput_eveniment",
    "data_sfarsit_eveniment",
    "mentiuni",
    "nume_categorie_sub_eveniment",
    "nume_locatie",
    "cost_acces",
    "cost_bautura",
    "cost_elemente_design",
    "cost_media",
    "cost_meniu",
    "cost_momente_artistice",
    "cost_total_eveniment"
  ];
  dataSource: MatTableDataSource<HomeEveniment> = new MatTableDataSource(
    this.evenimente
  );

  constructor(
    private toastr: ToastrService,
    private loading: LoadingService,
    private welcomeService: WelcomeService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.GetEvenimente();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  UpdateDataSource(){
    this.dataSource = new MatTableDataSource(this.evenimente);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetEvenimente() {
    this.loading.start();
    this.welcomeService
      .GetEvenimente(
        this.loginService.getUser().id_utilizator,
        this.minValueFilter ? this.minValueFilter : 0,
        this.maxValueFilter ? this.maxValueFilter : 0
      )
      .subscribe(response => {
        this.loading.stop();
        this.evenimente = response;
        this.UpdateDataSource();
      });
  }

  LoadTop(){
    this.loading.start();
    this.welcomeService
      .GetTopTipEvenimente(
        this.loginService.getUser().id_utilizator,
        this.minimEvenimenteCreate ? this.minimEvenimenteCreate : 0
      )
      .subscribe(response => {
        this.loading.stop();
        this.top = response;
      });
  }

  Search() {}
}
