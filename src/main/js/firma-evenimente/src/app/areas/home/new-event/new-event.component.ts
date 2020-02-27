import { AddEveniment } from "./../../../Models/home/add-eveniment";
import { ConfigurariTipAcces } from "./../../../Models/admin/configurari-tip-acces";
import { TipAcces } from "./../../../Models/admin/tip-acces";
import { TipServireMeniu } from "./../../../Models/admin/tip-servire-meniu";
import { TipMedia } from "./../../../Models/admin/tip-media";
import { TipMomentArtistic } from "./../../../Models/admin/tip-moment-artistic";
import { BauturaEveniment } from "./../../../Models/home/bautura-eveniment";
import { Bautura } from "./../../../Models/admin/bautura";
import { Locatie } from "./../../../Models/admin/locatie";
import { SubLocatie } from "./../../../Models/admin/sub-locatie";
import { SeeDetailsComponent } from "./see-details/see-details.component";
import { TipLocatie } from "./../../../Models/admin/tip-locatie";
import { SubTipEveniment } from "./../../../Models/admin/sub-tip-eveniment";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { TipEveniment } from "./../../../Models/admin/tip-eveniment";
import { LoadingService } from "./../../../modules/loading-spinner/loading.service";
import { NewEventService } from "./new-event.service";
import { ToastrService } from "./../../../services/toastr.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatStepper,
  MatDialog,
  MatSort,
  MatPaginator,
  MatTableDataSource
} from "@angular/material";
import { ElementeDesign } from "src/app/Models/admin/elemente-design";
import { ElementeDesignEveniment } from "src/app/Models/home/elemente-design-eveniment";
import { MomenteArtistice } from "src/app/Models/admin/momente-artistice";
import { MomenteArtisticeEveniment } from "src/app/Models/home/momente-artistice-eveniment";
import { MediaEveniment } from "src/app/Models/home/media-eveniment";
import { Media } from "src/app/Models/admin/media";
import { TipMeniu } from "src/app/Models/admin/tip-meniu";
import { TipMeniuEveniment } from "src/app/Models/home/tip-meniu-eveniment";
import { ConfigurariTipAccesEveniment } from "src/app/Models/home/configurari-tip-acces-eveniment";
import { LoginService } from "../../login/login.service";

@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.scss"]
})
export class NewEventComponent implements OnInit {
  @ViewChild("stepper", { static: false }) private stepper: MatStepper;
  isLinear = true;
  dateGeneraleEvenimentFormGroup: FormGroup;
  get dateGeneraleEvenimentFormGroupVal() {
    return this.dateGeneraleEvenimentFormGroup.controls;
  }
  tipDeEvenimentFormGroup: FormGroup;
  get tipDeEvenimentFormGroupVal() {
    return this.tipDeEvenimentFormGroup.controls;
  }
  tipEvenimente: TipEveniment[] = [];

  subTipDeEvenimentFormGroup: FormGroup;
  get subTipDeEvenimentFormGroupVal() {
    return this.subTipDeEvenimentFormGroup.controls;
  }
  subTipEvenimente: SubTipEveniment[] = [];

  tipLocatiiFormGroup: FormGroup;
  get tipLocatiiFormGroupVal() {
    return this.tipLocatiiFormGroup.controls;
  }
  tipLocatii: TipLocatie[] = [];

  subLocatiiFormGroup: FormGroup;
  get subLocatiiFormGroupVal() {
    return this.subLocatiiFormGroup.controls;
  }
  subLocatii: SubLocatie[] = [];

  locatiiFormGroup: FormGroup;
  get locatiiFormGroupVal() {
    return this.locatiiFormGroup.controls;
  }
  locatii: Locatie[] = [];

  bautura: Bautura[] = [];
  bauturaEveniment: BauturaEveniment[] = [];
  bauturaAccordionOpened = 1;
  @ViewChild(MatSort, { static: false }) sortBautura: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorBautura: MatPaginator;
  dataSourceBautura: MatTableDataSource<
    BauturaEveniment
  > = new MatTableDataSource(this.bauturaEveniment);
  displayedColumnsBautura: string[] = [
    "nume_bautura",
    "gramaj",
    "pret_pret_bucata",
    "pret_per_bax",
    "pret_vanzare",
    "cantitate",
    "cost_total",
    "actions"
  ];
  editItemBautura: BauturaEveniment = new BauturaEveniment();
  addEditBautura = "add";

  elementeDesign: ElementeDesign[] = [];
  elementeDesignEveniment: ElementeDesignEveniment[] = [];
  elementeDesignAccordionOpened = 1;
  @ViewChild(MatSort, { static: false }) sortElementeDesign: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginatorElementeDesign: MatPaginator;
  dataSourceElementeDesign: MatTableDataSource<
    ElementeDesignEveniment
  > = new MatTableDataSource(this.elementeDesignEveniment);
  displayedColumnsElementeDesign: string[] = [
    "nume_element",
    "cantitate_element",
    "pret_per_element",
    "discount",
    "numar_minim_elemente_pentru_reducere",
    "cantitate",
    "cost_total",
    "actions"
  ];
  editItemElementeDesign: ElementeDesignEveniment = new ElementeDesignEveniment();
  addEditElementeDesign = "add";

  tipMomentArtistic: TipMomentArtistic[] = [];
  tipMomentArtisticSelected: TipMomentArtistic = new TipMomentArtistic();

  momenteArtistice: MomenteArtistice[] = [];
  momenteArtisticeBackup: MomenteArtistice[] = [];
  momenteArtisticeEveniment: MomenteArtisticeEveniment[] = [];
  momenteArtisticeAccordionOpened = 1;
  @ViewChild(MatSort, { static: false }) sortMomenteArtistice: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginatorMomenteArtistice: MatPaginator;
  dataSourceMomenteArtistice: MatTableDataSource<
    MomenteArtisticeEveniment
  > = new MatTableDataSource(this.momenteArtisticeEveniment);
  displayedColumnsMomenteArtistice: string[] = [
    "nume_tip_moment_artistic",
    "nume_categorie_moment_artistic",
    "timp_moment",
    "pret_per_moment",
    "numar_persoane_implicate",
    "ora_inceput",
    "ora_sfarsit",
    "actions"
  ];
  editItemMomenteArtistice: MomenteArtisticeEveniment = new MomenteArtisticeEveniment();
  addEditMomenteArtistice = "add";

  tipMedia: TipMedia[] = [];
  tipMediaSelected: TipMedia = new TipMedia();

  media: Media[] = [];
  mediaBackup: Media[] = [];
  mediaEveniment: MediaEveniment[] = [];
  mediaAccordionOpened = 1;
  @ViewChild(MatSort, { static: false }) sortMedia: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginatorMedia: MatPaginator;
  dataSourceMedia: MatTableDataSource<MediaEveniment> = new MatTableDataSource(
    this.mediaEveniment
  );
  displayedColumnsMedia: string[] = [
    "denumire",
    "nume_media",
    "pret",
    "cantitate",
    "cost_total",
    "actions"
  ];
  editItemMedia: MediaEveniment = new MediaEveniment();
  addEditMedia = "add";

  tipServireMeniu: TipServireMeniu[] = [];
  tipServireMeniuSelected: TipServireMeniu = new TipServireMeniu();

  tipMeniu: TipMeniu[] = [];
  tipMeniuBackup: TipMeniu[] = [];
  tipMeniuEveniment: TipMeniuEveniment[] = [];
  tipMeniuAccordionOpened = 1;
  @ViewChild(MatSort, { static: false }) sortTipMeniu: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginatorTipMeniu: MatPaginator;
  dataSourceTipMeniu: MatTableDataSource<
    TipMeniuEveniment
  > = new MatTableDataSource(this.tipMeniuEveniment);
  displayedColumnsTipMeniu: string[] = [
    "nume_meniu",
    "denumire_tip_servire",
    "cost_tip_meniu",
    "reducere",
    "minim_portii_pentru_reducere",
    "cantitate_tip_meniu",
    "cost_total",
    "actions"
  ];
  editItemTipMeniu: TipMeniuEveniment = new TipMeniuEveniment();
  addEditTipMeniu = "add";

  tipAcces: TipAcces[] = [];
  tipAccesSelected: TipAcces = new TipAcces();

  configurariTipAcces: ConfigurariTipAcces[] = [];
  configurariTipAccesBackup: ConfigurariTipAcces[] = [];
  configurariTipAccesEveniment: ConfigurariTipAccesEveniment[] = [];
  configurariTipAccesAccordionOpened = 1;
  @ViewChild(MatSort, { static: false }) sortConfigurariTipAcces: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginatorConfigurariTipAcces: MatPaginator;
  dataSourceConfigurariTipAcces: MatTableDataSource<
    ConfigurariTipAccesEveniment
  > = new MatTableDataSource(this.configurariTipAccesEveniment);
  displayedColumnsConfigurariTipAcces: string[] = [
    "denumire_configurare_acces",
    "cost_realizare",
    "cantitate_acces",
    "pret_acces",
    "discount_avans",
    "discount_student",
    "data_inceput_vanzare",
    "data_final_vanzare",
    "cost_realizare_total",
    "actions"
  ];
  editItemConfigurariTipAcces: ConfigurariTipAccesEveniment = new ConfigurariTipAccesEveniment();
  addEditConfigurariTipAcces = "add";

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private newEventService: NewEventService,
    private loading: LoadingService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {
    //   this.GetTipEvenimente();
    //  this.GetBautura();
    //  this.GetElementeDesign();
    // this.CheckElementeDesign();
    // this.CheckMomenteArtistice();
    // this.CheckMedia();
  }

  ngOnInit() {
    this.dateGeneraleEvenimentFormGroup = this._formBuilder.group({
      data_inceput: ["", Validators.required],
      data_sfarsit: ["", Validators.required],
      mentiuni: [""]
    });

    this.tipDeEvenimentFormGroup = this._formBuilder.group({
      tip_eveniment: ["", Validators.required]
    });

    this.subTipDeEvenimentFormGroup = this._formBuilder.group({
      sub_tip_eveniment: ["", Validators.required]
    });

    this.tipLocatiiFormGroup = this._formBuilder.group({
      tip_locatie: ["", Validators.required]
    });

    this.subLocatiiFormGroup = this._formBuilder.group({
      sub_locatie: ["", Validators.required]
    });

    this.locatiiFormGroup = this._formBuilder.group({
      locatie: ["", Validators.required]
    });
  }

  CheckDaysAvailable() {
    if (this.dateGeneraleEvenimentFormGroup.valid) {
      this.loading.start();
      let data_inceput: Date = new Date(
        this.dateGeneraleEvenimentFormGroup.controls.data_inceput.value
      );
      let data_sfarsit: Date = new Date(
        this.dateGeneraleEvenimentFormGroup.controls.data_sfarsit.value
      );
      this.newEventService
        .CheckValidDates(data_inceput, data_sfarsit)
        .subscribe(
          response => {
            this.loading.stop();

            if (response == true) {
              this.toastr.Toast.fire({
                icon: "success",
                title:
                  "Datele selectate sunt valabile, alege tipul de eveniment!"
              });
              this.GetTipEvenimente();
            } else {
              this.toastr.Toast.fire({
                icon: "warning",
                title:
                  "Datele selectate nu sunt valabile, contacteaza administratorii pentru detalii!"
              });
            }
          },
          _ => {
            this.toastr.Toast.fire({
              icon: "error",
              title:
                "A aparut o eroare, te rugam incearca din nou sau contacteaza administratorii site-ului!"
            });
          }
        );
    }
  }
  GetTipEvenimente() {
    this.loading.start();
    this.newEventService.GetTipEvenimente().subscribe(response => {
      this.loading.stop();
      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: "warning",
          title: "Nu exista tipuri de evenimente in baza de date!"
        });
      } else {
        this.tipEvenimente = response;
        this.tipEvenimente.forEach(
          e =>
            (e.imagine_tip_eveniment_src = this.AddSrcPrefix(
              e.imagine_tip_eveniment
            ))
        );
        this.stepper.next();
      }
    });
  }

  SelectTipEveniment(tipEv: TipEveniment) {
    this.tipDeEvenimentFormGroup.controls.tip_eveniment.setValue(tipEv);
  }

  CheckTipEveniment() {
    if (this.tipDeEvenimentFormGroup.valid) {
      const tipEveniment: TipEveniment = new TipEveniment(
        this.tipDeEvenimentFormGroup.controls.tip_eveniment.value
      );
      this.GetSubTipEveniment(tipEveniment);
    }
  }

  GetSubTipEveniment(tipEveniment: TipEveniment) {
    this.loading.start();
    this.newEventService
      .GetSubTipEvenimente(tipEveniment.id_tip_eveniment)
      .subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista sub-tipuri de evenimente in baza de date!"
          });
        } else {
          this.subTipEvenimente = response;
          this.subTipEvenimente.forEach(
            e =>
              (e.imagine_sub_eveniment_src = this.AddSrcPrefix(
                e.imagine_sub_eveniment
              ))
          );
          this.stepper.next();
        }
      });
  }

  SelectSubTipEvenimient(subTipEv: SubTipEveniment) {
    this.subTipDeEvenimentFormGroup.controls.sub_tip_eveniment.setValue(
      subTipEv
    );
  }

  CheckSubTipEveniment() {
    if (this.subTipDeEvenimentFormGroup.valid) {
      const subTipEveniment: SubTipEveniment = new SubTipEveniment(
        this.subTipDeEvenimentFormGroup.controls.sub_tip_eveniment.value
      );
      this.GetTipLocatie(subTipEveniment);
    }
  }

  GetTipLocatie(subTipEveniment: SubTipEveniment) {
    this.loading.start();
    this.newEventService
      .GetTipLocatie(subTipEveniment.id_sub_eveniment)
      .subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista locatii in baza de date!"
          });
        } else {
          this.tipLocatii = response;
          this.tipLocatii.forEach(
            e =>
              (e.imagine_tip_locatie_src = this.AddSrcPrefix(
                e.imagine_tip_locatie
              ))
          );
          this.stepper.next();
        }
      });
  }

  SelectTipLocatie(tipLoc: TipLocatie) {
    this.tipLocatiiFormGroup.controls.tip_locatie.setValue(tipLoc);
  }

  SeeDetailsTipLocatie(tipLocatie: TipLocatie) {
    this.SeeDetails(
      tipLocatie.nume_categorie_locatie,
      tipLocatie.imagine_tip_locatie_src,
      tipLocatie.descriere
    );
  }

  CheckTipLocatie() {
    if (this.tipLocatiiFormGroup.valid) {
      const tipLocatie: TipLocatie = new TipLocatie(
        this.tipLocatiiFormGroup.controls.tip_locatie.value
      );
      this.GetSubLocatii(tipLocatie);
    }
  }

  GetSubLocatii(tipLocatie: TipLocatie) {
    this.loading.start();
    this.newEventService
      .GetSubLocatie(tipLocatie.id_tip_locatie)
      .subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista sub-locatii in baza de date!"
          });
        } else {
          this.subLocatii = response;
          this.subLocatii.forEach(
            e =>
              (e.imagine_sub_locatie_src = this.AddSrcPrefix(
                e.imagine_sub_locatie
              ))
          );
          this.stepper.next();
        }
      });
  }

  SelectSubLocatie(subLoc: SubLocatie) {
    this.subLocatiiFormGroup.controls.sub_locatie.setValue(subLoc);
  }

  CheckSubLocatie() {
    if (this.subLocatiiFormGroup.valid) {
      const subLoc: SubLocatie = new SubLocatie(
        this.subLocatiiFormGroup.controls.sub_locatie.value
      );
      this.GetLocatii(subLoc);
    }
  }

  GetLocatii(subLocatie: SubLocatie) {
    this.loading.start();
    this.newEventService
      .GetLocatie(subLocatie.id_sub_locatie)
      .subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista sub-locatii in baza de date!"
          });
        } else {
          this.locatii = response;
          this.locatii.forEach(
            e => (e.imagine_locatie_src = this.AddSrcPrefix(e.imagine_locatie))
          );
          this.stepper.next();
        }
      });
  }

  SelectLocatie(loc: Locatie) {
    this.locatiiFormGroup.controls.locatie.setValue(loc);
  }

  CheckLocatie() {
    if (this.locatiiFormGroup.valid) {
      this.GetBautura();
    }
  }

  GetBautura() {
    if (this.bautura.length == 0) {
      this.loading.start();
      this.newEventService.GetBautura().subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista sub-locatii in baza de date!"
          });
        } else {
          this.bautura = response;
          this.bautura.forEach(
            e => (e.imagine_bautura_src = this.AddSrcPrefix(e.imagine_bautura))
          );
          this.stepper.next();
        }
      });
    } else {
      this.stepper.next();
    }
  }

  UpdateDataSourceBautura() {
    this.dataSourceBautura = new MatTableDataSource(this.bauturaEveniment);
    this.dataSourceBautura.sort = this.sortBautura;
    this.dataSourceBautura.paginator = this.paginatorBautura;
  }

  AddBautura(bautura: Bautura) {
    const idx = this.bauturaEveniment
      .map(e => e.id_bautura)
      .indexOf(bautura.id_bautura);

    if (idx >= 0) {
      this.addEditBautura = "edit";
      this.editItemBautura = Object.assign({}, this.bauturaEveniment[idx]);
    } else {
      this.addEditBautura = "add";
      const bauturaAdd: BauturaEveniment = {
        bautura,
        id_bautura: bautura.id_bautura,
        pret_vanzare: null,
        cantitate: null,
        cost_unitar: bautura.pret_pret_bucata,
        cost_total: null
      } as BauturaEveniment;
      this.bauturaEveniment.unshift(bauturaAdd);
      this.editItemBautura = Object.assign({}, bauturaAdd);
    }

    this.UpdateDataSourceBautura();
    this.bauturaAccordionOpened = 2;
  }

  DeleteBauturaEveniment(bautura: BauturaEveniment) {
    const idx = this.bauturaEveniment
      .map(e => e.bautura.id_bautura)
      .indexOf(bautura.id_bautura);
    this.bauturaEveniment.splice(idx, 1);
    this.UpdateDataSourceBautura();
  }

  EditBauturaEveniment(bautura: BauturaEveniment) {
    this.editItemBautura = Object.assign({}, bautura);
  }

  RenuntaEditBautura(bautura: BauturaEveniment) {
    if (this.addEditBautura == "add") {
      this.bauturaEveniment.shift();
    }
    this.editItemBautura = null;
    this.UpdateDataSourceBautura();
  }

  ConfirmEditBautura() {
    if (!this.editItemBautura.cantitate) {
      this.toastr.Toast.fire({
        icon: "warning",
        title: "Cantitatea este obligatorie!"
      });
      return;
    }
    this.editItemBautura.pret_vanzare = this.editItemBautura.pret_vanzare
      ? this.editItemBautura.pret_vanzare
      : 0;
    const baxuri = Math.floor(this.editItemBautura.cantitate / 6) * 6;
    this.editItemBautura.cost_total =
      baxuri * this.editItemBautura.bautura.pret_per_bax +
      (this.editItemBautura.cantitate - baxuri) *
        this.editItemBautura.bautura.pret_pret_bucata;

    const idx = this.bauturaEveniment
      .map(e => e.id_bautura)
      .indexOf(this.editItemBautura.id_bautura);
    this.bauturaEveniment[idx] = Object.assign({}, this.editItemBautura);
    this.editItemBautura = null;
    this.UpdateDataSourceBautura();
  }

  CheckBautura() {
    this.GetElementeDesign();
  }

  GetElementeDesign() {
    if (this.elementeDesign.length == 0) {
      this.loading.start();
      this.newEventService.GetElementeDesign().subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista sub-locatii in baza de date!"
          });
        } else {
          this.elementeDesign = response;
          this.elementeDesign.forEach(
            e =>
              (e.imagine_element_design_src = this.AddSrcPrefix(
                e.imagine_element_design
              ))
          );
          this.stepper.next();
        }
      });
    } else {
      this.stepper.next();
    }
  }

  UpdateDataSourceElementeDesign() {
    this.dataSourceElementeDesign = new MatTableDataSource(
      this.elementeDesignEveniment
    );
    this.dataSourceElementeDesign.sort = this.sortElementeDesign;
    this.dataSourceElementeDesign.paginator = this.paginatorElementeDesign;
  }

  AddElementeDesign(elementeDesign: ElementeDesign) {
    const idx = this.elementeDesignEveniment
      .map(e => e.id_element_design)
      .indexOf(elementeDesign.id_element_design);

    if (idx >= 0) {
      this.addEditElementeDesign = "edit";
      this.editItemElementeDesign = Object.assign(
        {},
        this.elementeDesignEveniment[idx]
      );
    } else {
      this.addEditElementeDesign = "add";
      const elementeDesignAdd: ElementeDesignEveniment = {
        elementeDesign,
        id_element_design: elementeDesign.id_element_design,
        cantitate: null,
        cost_unitar: elementeDesign.pret_per_element,
        cost_total: null
      } as ElementeDesignEveniment;
      this.elementeDesignEveniment.unshift(elementeDesignAdd);
      this.editItemElementeDesign = Object.assign({}, elementeDesignAdd);
    }

    this.UpdateDataSourceElementeDesign();
    this.elementeDesignAccordionOpened = 2;
  }

  DeleteElementeDesignEveniment(elementeDesign: ElementeDesignEveniment) {
    const idx = this.elementeDesignEveniment
      .map(e => e.elementeDesign.id_element_design)
      .indexOf(elementeDesign.id_element_design);
    this.elementeDesignEveniment.splice(idx, 1);
    this.UpdateDataSourceElementeDesign();
  }

  EditElementeDesignEveniment(elementeDesign: ElementeDesignEveniment) {
    this.editItemElementeDesign = Object.assign({}, elementeDesign);
  }

  RenuntaEditElementeDesign(elementeDesign: ElementeDesignEveniment) {
    if (this.addEditElementeDesign == "add") {
      this.elementeDesignEveniment.shift();
    }
    this.editItemElementeDesign = null;
    this.UpdateDataSourceElementeDesign();
  }

  ConfirmEditElementeDesign() {
    if (!this.editItemElementeDesign.cantitate) {
      this.toastr.Toast.fire({
        icon: "warning",
        title: "Cantitatea este obligatorie!"
      });
      return;
    }

    const discount = this.editItemElementeDesign.elementeDesign.discount
      ? this.editItemElementeDesign.elementeDesign.discount
      : 0;

    if (discount > 0) {
      const discountValue =
        (discount / 100) *
        this.editItemElementeDesign.cantitate *
        this.editItemElementeDesign.elementeDesign.pret_per_element;

      this.editItemElementeDesign.cost_total =
        this.editItemElementeDesign.cantitate >=
        this.editItemElementeDesign.elementeDesign
          .numar_minim_elemente_pentru_reducere
          ? this.editItemElementeDesign.cantitate *
              this.editItemElementeDesign.elementeDesign.pret_per_element -
            discountValue
          : this.editItemElementeDesign.cantitate *
            this.editItemElementeDesign.elementeDesign.pret_per_element;
    } else {
      this.editItemElementeDesign.cost_total =
        this.editItemElementeDesign.cantitate *
        this.editItemElementeDesign.elementeDesign.pret_per_element;
    }
    const idx = this.elementeDesignEveniment
      .map(e => e.id_element_design)
      .indexOf(this.editItemElementeDesign.id_element_design);
    this.elementeDesignEveniment[idx] = Object.assign(
      {},
      this.editItemElementeDesign
    );
    this.editItemElementeDesign = null;
    this.UpdateDataSourceElementeDesign();
  }

  CheckElementeDesign() {
    this.GetTipMomentArtistic();
    this.GetMomenteArtistice();
  }

  GetTipMomentArtistic() {
    if (this.tipMomentArtistic.length == 0) {
      this.loading.start();
      this.newEventService.GetTipMomentArtistic().subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista sub-locatii in baza de date!"
          });
        } else {
          this.tipMomentArtistic = response;
          this.tipMomentArtistic.forEach(
            e =>
              (e.imagine_tip_moment_artistic_src = this.AddSrcPrefix(
                e.imagine_tip_moment_artistic
              ))
          );
          this.stepper.next();
        }
      });
    } else {
      this.stepper.next();
    }
  }

  SelectTipMomentArtistic(tipMomentArtistic: TipMomentArtistic) {
    this.tipMomentArtisticSelected = tipMomentArtistic;
    this.momenteArtistice = this.momenteArtisticeBackup.filter(
      e => e.id_tip_moment == tipMomentArtistic.id_tip_moment
    );
    this.momenteArtisticeAccordionOpened = 2;
  }

  GetMomenteArtistice() {
    this.loading.start();
    this.newEventService.GetMomenteArtistice().subscribe(response => {
      this.loading.stop();
      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: "warning",
          title: "Nu exista sub-locatii in baza de date!"
        });
      } else {
        this.momenteArtistice = response;
        this.momenteArtisticeBackup = Object.assign([], this.momenteArtistice);
      }
    });
  }

  UpdateDataSourceMomenteArtistice() {
    this.dataSourceMomenteArtistice = new MatTableDataSource(
      this.momenteArtisticeEveniment
    );
    this.dataSourceMomenteArtistice.sort = this.sortMomenteArtistice;
    this.dataSourceMomenteArtistice.paginator = this.paginatorMomenteArtistice;
  }

  AddMomenteArtistice(momenteArtistice: MomenteArtistice) {
    const idx = this.momenteArtisticeEveniment
      .map(e => e.id_moment_artistic)
      .indexOf(momenteArtistice.id_moment_artistic);

    if (idx >= 0) {
      this.addEditMomenteArtistice = "edit";
      this.editItemMomenteArtistice = Object.assign(
        {},
        this.momenteArtisticeEveniment[idx]
      );
    } else {
      this.addEditMomenteArtistice = "add";
      const momenteArtisticeAdd: MomenteArtisticeEveniment = {
        momenteArtistice,
        id_moment_artistic: momenteArtistice.id_moment_artistic,
        cost: momenteArtistice.pret_per_moment,
        ora_inceput: null,
        ora_sfarsit: null
      } as MomenteArtisticeEveniment;
      this.momenteArtisticeEveniment.unshift(momenteArtisticeAdd);
      this.editItemMomenteArtistice = Object.assign({}, momenteArtisticeAdd);
    }

    this.UpdateDataSourceMomenteArtistice();
    this.momenteArtisticeAccordionOpened = 3;
  }

  DeleteMomenteArtisticeEveniment(momenteArtistice: MomenteArtisticeEveniment) {
    const idx = this.momenteArtisticeEveniment
      .map(e => e.momenteArtistice.id_moment_artistic)
      .indexOf(momenteArtistice.id_moment_artistic);
    this.momenteArtisticeEveniment.splice(idx, 1);
    this.UpdateDataSourceMomenteArtistice();
  }

  EditMomenteArtisticeEveniment(momenteArtistice: MomenteArtisticeEveniment) {
    this.editItemMomenteArtistice = Object.assign({}, momenteArtistice);
  }

  RenuntaEditMomenteArtistice(momenteArtistice: MomenteArtisticeEveniment) {
    if (this.addEditMomenteArtistice == "add") {
      this.momenteArtisticeEveniment.shift();
    }
    this.editItemMomenteArtistice = null;
    this.UpdateDataSourceMomenteArtistice();
  }

  ConfirmEditMomenteArtistice() {
    if (!this.editItemMomenteArtistice.ora_inceput) {
      this.toastr.Toast.fire({
        icon: "warning",
        title: "Ora de inceput este obligatorie!"
      });
      return;
    }
    if (
      typeof this.editItemMomenteArtistice.ora_inceput === "string" ||
      this.editItemMomenteArtistice.ora_inceput instanceof String
    ) {
      const dateString: string[] = (this.editItemMomenteArtistice
        .ora_inceput as any).split(":");
      this.editItemMomenteArtistice.ora_inceput = new Date(
        this.dateGeneraleEvenimentFormGroup.controls.data_inceput.value
      );
      this.editItemMomenteArtistice.ora_inceput.setHours(
        parseInt(dateString[0])
      );
      this.editItemMomenteArtistice.ora_inceput.setMinutes(
        parseInt(dateString[1])
      );
    }
    this.editItemMomenteArtistice.ora_sfarsit = new Date(
      this.editItemMomenteArtistice.ora_inceput
    );
    this.editItemMomenteArtistice.ora_sfarsit.setMinutes(
      this.editItemMomenteArtistice.ora_inceput.getMinutes() +
        this.editItemMomenteArtistice.momenteArtistice.timp_moment
    );

    const idx = this.momenteArtisticeEveniment
      .map(e => e.id_moment_artistic)
      .indexOf(this.editItemMomenteArtistice.id_moment_artistic);
    this.momenteArtisticeEveniment[idx] = Object.assign(
      {},
      this.editItemMomenteArtistice
    );
    this.editItemMomenteArtistice = null;
    this.UpdateDataSourceMomenteArtistice();
  }

  CheckMomenteArtistice() {
    this.GetTipMedia();
    this.GetMedia();
  }

  GetTipMedia() {
    if (this.tipMedia.length == 0) {
      this.loading.start();
      this.newEventService.GetTipMedia().subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista tipuri media in baza de date!"
          });
        } else {
          this.tipMedia = response;
          this.tipMedia.forEach(
            e =>
              (e.imagine_tip_media_src = this.AddSrcPrefix(e.imagine_tip_media))
          );
          this.stepper.next();
        }
      });
    } else {
      this.stepper.next();
    }
  }

  SelectTipMedia(tipMedia: TipMedia) {
    this.tipMediaSelected = tipMedia;
    this.media = this.mediaBackup.filter(
      e => e.id_tip_media == tipMedia.id_tip_media
    );
    this.mediaAccordionOpened = 2;
  }

  GetMedia() {
    this.loading.start();
    this.newEventService.GetMedia().subscribe(response => {
      this.loading.stop();
      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: "warning",
          title: "Nu exista media in baza de date!"
        });
      } else {
        this.media = response;
        this.media.forEach(
          e => (e.imagine_media_src = this.AddSrcPrefix(e.imagine_media))
        );
        this.mediaBackup = Object.assign([], this.media);
      }
    });
  }

  UpdateDataSourceMedia() {
    this.dataSourceMedia = new MatTableDataSource(this.mediaEveniment);
    this.dataSourceMedia.sort = this.sortMedia;
    this.dataSourceMedia.paginator = this.paginatorMedia;
  }

  AddMedia(media: Media) {
    const idx = this.mediaEveniment
      .map(e => e.id_media)
      .indexOf(media.id_media);

    if (idx >= 0) {
      this.addEditMedia = "edit";
      this.editItemMedia = Object.assign({}, this.mediaEveniment[idx]);
    } else {
      this.addEditMedia = "add";
      const mediaAdd: MediaEveniment = {
        media,
        id_media: media.id_media,
        cantitate: null,
        cost_unitar: media.pret,
        cost_total: null
      } as MediaEveniment;
      this.mediaEveniment.unshift(mediaAdd);
      this.editItemMedia = Object.assign({}, mediaAdd);
    }

    this.UpdateDataSourceMedia();
    this.mediaAccordionOpened = 3;
  }

  DeleteMediaEveniment(media: MediaEveniment) {
    const idx = this.mediaEveniment
      .map(e => e.media.id_media)
      .indexOf(media.id_media);
    this.mediaEveniment.splice(idx, 1);
    this.UpdateDataSourceMedia();
  }

  EditMediaEveniment(media: MediaEveniment) {
    this.editItemMedia = Object.assign({}, media);
  }

  RenuntaEditMedia(media: MediaEveniment) {
    if (this.addEditMedia == "add") {
      this.mediaEveniment.shift();
    }
    this.editItemMedia = null;
    this.UpdateDataSourceMedia();
  }

  ConfirmEditMedia() {
    if (!this.editItemMedia.cantitate) {
      this.toastr.Toast.fire({
        icon: "warning",
        title: "Cantitatea este obligatorie!"
      });
      return;
    }

    this.editItemMedia.cost_total =
      this.editItemMedia.media.pret * this.editItemMedia.cantitate;

    const idx = this.mediaEveniment
      .map(e => e.id_media)
      .indexOf(this.editItemMedia.id_media);
    this.mediaEveniment[idx] = Object.assign({}, this.editItemMedia);
    this.editItemMedia = null;
    this.UpdateDataSourceMedia();
  }

  CheckMedia() {
    this.GetTipServireMeniu();
    this.GetTipMeniu();
  }

  GetTipServireMeniu() {
    if (this.tipServireMeniu.length == 0) {
      this.loading.start();
      this.newEventService.GetTipServireMeniu().subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title: "Nu exista tipuri de servire meniu in baza de date!"
          });
        } else {
          this.tipServireMeniu = response;
          this.tipServireMeniu.forEach(
            e =>
              (e.imagine_tip_servire_src = this.AddSrcPrefix(
                e.imagine_tip_servire
              ))
          );
          this.stepper.next();
        }
      });
    } else {
      this.stepper.next();
    }
  }

  SelectTipServireMeniu(tipServireMeniu: TipServireMeniu) {
    this.tipServireMeniuSelected = tipServireMeniu;
    this.tipMeniu = this.tipMeniuBackup.filter(
      e => e.id_tip_servire_meniu == tipServireMeniu.id_tip_servire_meniu
    );
    this.tipMeniuAccordionOpened = 2;
  }

  GetTipMeniu() {
    this.loading.start();
    this.newEventService.GetTipMeniu().subscribe(response => {
      this.loading.stop();
      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: "warning",
          title: "Nu exista tipMeniu in baza de date!"
        });
      } else {
        this.tipMeniu = response;
        this.tipMeniu.forEach(
          e => (e.imagine_meniu_src = this.AddSrcPrefix(e.imagine_meniu))
        );
        this.tipMeniuBackup = Object.assign([], this.tipMeniu);
      }
    });
  }

  UpdateDataSourceTipMeniu() {
    this.dataSourceTipMeniu = new MatTableDataSource(this.tipMeniuEveniment);
    this.dataSourceTipMeniu.sort = this.sortTipMeniu;
    this.dataSourceTipMeniu.paginator = this.paginatorTipMeniu;
  }

  AddTipMeniu(tipMeniu: TipMeniu) {
    const idx = this.tipMeniuEveniment
      .map(e => e.id_tip_meniu)
      .indexOf(tipMeniu.id_tip_meniu);

    if (idx >= 0) {
      this.addEditTipMeniu = "edit";
      this.editItemTipMeniu = Object.assign({}, this.tipMeniuEveniment[idx]);
    } else {
      this.addEditTipMeniu = "add";
      const tipMeniuAdd: TipMeniuEveniment = {
        tipMeniu,
        id_tip_meniu: tipMeniu.id_tip_meniu,
        cantitate_tip_meniu: null,
        cost_unitar_tip_meniu: tipMeniu.cost_tip_meniu,
        cost_total: null
      } as TipMeniuEveniment;
      this.tipMeniuEveniment.unshift(tipMeniuAdd);
      this.editItemTipMeniu = Object.assign({}, tipMeniuAdd);
    }

    this.UpdateDataSourceTipMeniu();
    this.tipMeniuAccordionOpened = 3;
  }

  DeleteTipMeniuEveniment(tipMeniu: TipMeniuEveniment) {
    const idx = this.tipMeniuEveniment
      .map(e => e.tipMeniu.id_tip_meniu)
      .indexOf(tipMeniu.id_tip_meniu);
    this.tipMeniuEveniment.splice(idx, 1);
    this.UpdateDataSourceTipMeniu();
  }

  EditTipMeniuEveniment(tipMeniu: TipMeniuEveniment) {
    this.editItemTipMeniu = Object.assign({}, tipMeniu);
  }

  RenuntaEditTipMeniu(tipMeniu: TipMeniuEveniment) {
    if (this.addEditTipMeniu == "add") {
      this.tipMeniuEveniment.shift();
    }
    this.editItemTipMeniu = null;
    this.UpdateDataSourceTipMeniu();
  }

  ConfirmEditTipMeniu() {
    if (!this.editItemTipMeniu.cantitate_tip_meniu) {
      this.toastr.Toast.fire({
        icon: "warning",
        title: "Cantitatea este obligatorie!"
      });
      return;
    }

    const discount = this.editItemTipMeniu.tipMeniu.reducere
      ? this.editItemTipMeniu.tipMeniu.reducere
      : 0;

    if (discount > 0) {
      const discountValue =
        (discount / 100) *
        this.editItemTipMeniu.cantitate_tip_meniu *
        this.editItemTipMeniu.tipMeniu.cost_tip_meniu;

      this.editItemTipMeniu.cost_total =
        this.editItemTipMeniu.cantitate_tip_meniu >=
        this.editItemTipMeniu.tipMeniu.minim_portii_pentru_reducere
          ? this.editItemTipMeniu.cantitate_tip_meniu *
              this.editItemTipMeniu.tipMeniu.cost_tip_meniu -
            discountValue
          : this.editItemTipMeniu.cantitate_tip_meniu *
            this.editItemTipMeniu.tipMeniu.cost_tip_meniu;
    } else {
      this.editItemTipMeniu.cost_total =
        this.editItemTipMeniu.cantitate_tip_meniu *
        this.editItemTipMeniu.tipMeniu.cost_tip_meniu;
    }

    const idx = this.tipMeniuEveniment
      .map(e => e.id_tip_meniu)
      .indexOf(this.editItemTipMeniu.id_tip_meniu);
    this.tipMeniuEveniment[idx] = Object.assign({}, this.editItemTipMeniu);
    this.editItemTipMeniu = null;
    this.UpdateDataSourceTipMeniu();
  }

  CheckTipMeniu() {
    this.GetTipAcces();
    this.GetConfigurariTipAcces();
  }

  GetTipAcces() {
    const tipSubEveniment = new SubTipEveniment(
      this.subTipDeEvenimentFormGroup.controls.sub_tip_eveniment.value
    );
    this.loading.start();
    this.newEventService
      .GetTipAcces(tipSubEveniment.id_sub_eveniment)
      .subscribe(response => {
        this.loading.stop();
        if (response.length == 0) {
          this.toastr.Toast.fire({
            icon: "warning",
            title:
              "Nu exista tipuri de acces in baza de date pentru acces sub-tip de eveniment!"
          });
        } else {
          this.tipAcces = response;
          this.stepper.next();
        }
      });
  }

  SelectTipAcces(tipAcces: TipAcces) {
    this.tipAccesSelected = tipAcces;
    this.configurariTipAcces = this.configurariTipAccesBackup.filter(
      e => e.id_acces == tipAcces.id_acces
    );
    this.configurariTipAccesAccordionOpened = 2;
  }

  GetConfigurariTipAcces() {
    this.loading.start();
    this.newEventService.GetConfigurariTipAcces().subscribe(response => {
      this.loading.stop();
      if (response.length == 0) {
        this.toastr.Toast.fire({
          icon: "warning",
          title: "Nu exista configurariTipAcces in baza de date!"
        });
      } else {
        this.configurariTipAcces = response;
        this.configurariTipAccesBackup = Object.assign(
          [],
          this.configurariTipAcces
        );
      }
    });
  }

  UpdateDataSourceConfigurariTipAcces() {
    this.dataSourceConfigurariTipAcces = new MatTableDataSource(
      this.configurariTipAccesEveniment
    );
    this.dataSourceConfigurariTipAcces.sort = this.sortConfigurariTipAcces;
    this.dataSourceConfigurariTipAcces.paginator = this.paginatorConfigurariTipAcces;
  }

  AddConfigurariTipAcces(configurariTipAcces: ConfigurariTipAcces) {
    const idx = this.configurariTipAccesEveniment
      .map(e => e.id_configurari_acces)
      .indexOf(configurariTipAcces.id_configurari_acces);

    if (idx >= 0) {
      this.addEditConfigurariTipAcces = "edit";
      this.editItemConfigurariTipAcces = Object.assign(
        {},
        this.configurariTipAccesEveniment[idx]
      );
    } else {
      this.addEditConfigurariTipAcces = "add";
      const configurariTipAccesAdd: ConfigurariTipAccesEveniment = {
        configurariTipAcces,
        id_configurari_acces: configurariTipAcces.id_configurari_acces,
        cantitate_acces: null,
        pret_acces: null,
        discount_avans: null,
        discount_student: null,
        cost_unitar_tip_acces: configurariTipAcces.cost_realizare,
        cost_realizare_total: null,
        data_inceput_vanzare: null,
        data_final_vanzare: null
      } as ConfigurariTipAccesEveniment;
      this.configurariTipAccesEveniment.unshift(configurariTipAccesAdd);
      this.editItemConfigurariTipAcces = Object.assign(
        {},
        configurariTipAccesAdd
      );
    }

    this.UpdateDataSourceConfigurariTipAcces();
    this.configurariTipAccesAccordionOpened = 3;
  }

  DeleteConfigurariTipAccesEveniment(
    configurariTipAcces: ConfigurariTipAccesEveniment
  ) {
    const idx = this.configurariTipAccesEveniment
      .map(e => e.configurariTipAcces.id_configurari_acces)
      .indexOf(configurariTipAcces.id_configurari_acces);
    this.configurariTipAccesEveniment.splice(idx, 1);
    this.UpdateDataSourceConfigurariTipAcces();
  }

  EditConfigurariTipAccesEveniment(
    configurariTipAcces: ConfigurariTipAccesEveniment
  ) {
    this.editItemConfigurariTipAcces = Object.assign({}, configurariTipAcces);
  }

  RenuntaEditConfigurariTipAcces(
    configurariTipAcces: ConfigurariTipAccesEveniment
  ) {
    if (this.addEditConfigurariTipAcces == "add") {
      this.configurariTipAccesEveniment.shift();
    }
    this.editItemConfigurariTipAcces = null;
    this.UpdateDataSourceConfigurariTipAcces();
  }

  ConfirmEditConfigurariTipAcces() {
    if (!this.editItemConfigurariTipAcces.cantitate_acces) {
      this.toastr.Toast.fire({
        icon: "warning",
        title: "Cantitatea este obligatorie!"
      });
      return;
    }

    if (!this.editItemConfigurariTipAcces.cantitate_acces) {
      this.editItemConfigurariTipAcces.cantitate_acces = 0;
    }

    if (!this.editItemConfigurariTipAcces.data_inceput_vanzare) {
      this.editItemConfigurariTipAcces.data_inceput_vanzare = new Date();
    }

    if (!this.editItemConfigurariTipAcces.data_final_vanzare) {
      this.editItemConfigurariTipAcces.data_final_vanzare = new Date(
        this.dateGeneraleEvenimentFormGroup.controls.data_inceput.value
      );
    }

    this.editItemConfigurariTipAcces.cost_realizare_total =
      this.editItemConfigurariTipAcces.cantitate_acces *
      this.editItemConfigurariTipAcces.configurariTipAcces.cost_realizare;

    const idx = this.configurariTipAccesEveniment
      .map(e => e.id_configurari_acces)
      .indexOf(this.editItemConfigurariTipAcces.id_configurari_acces);
    this.configurariTipAccesEveniment[idx] = Object.assign(
      {},
      this.editItemConfigurariTipAcces
    );
    this.editItemConfigurariTipAcces = null;
    this.UpdateDataSourceConfigurariTipAcces();
  }

  CheckConfigurariTipAcces() {
    this.stepper.next();
  }

  SaveEvenimentOrganizat() {
    let addEvent: AddEveniment = new AddEveniment();

    addEvent.data_inceput_eveniment = new Date(
      this.dateGeneraleEvenimentFormGroup.controls.data_inceput.value
    );
    addEvent.data_sfarsit_eveniment = new Date(
      this.dateGeneraleEvenimentFormGroup.controls.data_sfarsit.value
    );
    addEvent.mentiuni = this.dateGeneraleEvenimentFormGroup.controls.mentiuni.value;
    addEvent.id_utilizator = this.loginService.getUser().id_utilizator;
    addEvent.id_sub_eveniment = new SubTipEveniment(
      this.subTipDeEvenimentFormGroup.controls.sub_tip_eveniment.value
    ).id_sub_eveniment;
    addEvent.id_locatie = new Locatie(
      this.locatiiFormGroup.controls.locatie.value
    ).id_locatie;
    addEvent.bauturaEveniment = this.bauturaEveniment;
    addEvent.elementeDesignEveniment = this.elementeDesignEveniment;
    addEvent.momenteArtisticeEveniment = this.momenteArtisticeEveniment;
    addEvent.mediaEveniment = this.mediaEveniment;
    addEvent.tipMeniuEveniment = this.tipMeniuEveniment;
    addEvent.configurariTipAccesEveniment = this.configurariTipAccesEveniment;

    this.loading.start();
    this.newEventService.AddEveniment(addEvent).subscribe(
      response => {
        this.loading.stop();
        if(response.succes == false){
          this.toastr.Toast.fire(
            {
              icon:"error",
              title: response.mesaj
            }
          )
        }else
        {
          this.toastr.Toast.fire(
            {
              icon:"success",
              title: response.mesaj
            }
          )
        }
      },
      error => {
        this.loading.stop();
        this.toastr.Toast.fire(
          {
            icon:"error",
            title: error
          }
        )
      }
    );
  }

  SeeDetails(title: string, image: SafeResourceUrl, description: string) {
    const dialogRef = this.dialog.open(SeeDetailsComponent, {
      width: "600px",
      data: {
        title,
        image,
        description
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
      }
    });
  }

  AddSrcPrefix(file: string): SafeResourceUrl {
    const objectURL = "data:image/png;base64," + file;
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
  }
}
