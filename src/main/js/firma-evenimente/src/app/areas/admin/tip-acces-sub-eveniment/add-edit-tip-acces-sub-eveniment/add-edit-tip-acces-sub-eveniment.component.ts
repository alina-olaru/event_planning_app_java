import { TipAccesSubEveniment } from "./../../../../Models/admin/tip-acces-sub-eveniment";
import { SubTipEveniment } from "src/app/Models/admin/sub-tip-eveniment";
import { TipAcces } from "src/app/Models/admin/tip-acces";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

interface Data {
  type: string;
  model: TipAccesSubEveniment;
  first: TipAcces[];
  second: SubTipEveniment[];
}

@Component({
  selector: "app-add-edit-tip-acces-sub-eveniment",
  templateUrl: "./add-edit-tip-acces-sub-eveniment.component.html",
  styleUrls: ["./add-edit-tip-acces-sub-eveniment.component.scss"]
})
export class AddEditTipAccesSubEvenimentComponent implements OnInit {
  model: TipAccesSubEveniment;
  localForm: FormGroup;
  dropdownSelectedFirst: TipAcces;
  dropdownSelectedSecond: SubTipEveniment;
  filteredOptionsFirst: Observable<TipAcces[]>;
  filteredOptionsSecond: Observable<SubTipEveniment[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipAccesSubEvenimentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.data.model = new TipAccesSubEveniment();

    this.localForm = this.formBuilder.group({
      tip_acces: [this.dropdownSelectedFirst, Validators.required],
      tip_sub_eveniment: [this.dropdownSelectedFirst, Validators.required],
    });

    this.filteredOptionsFirst = this.localForm.controls[
      "tip_acces"
    ].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filterFirst(name) : this.data.first.slice()))
    );

    this.filteredOptionsSecond = this.localForm.controls[
      "tip_sub_eveniment"
    ].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filterSecond(name) : this.data.second.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFnFirst(tip?: TipAcces): string | undefined {
    return tip ? tip.modalitate_acces : undefined;
  }

  private _filterFirst(name: string): TipAcces[] {
    const filterValue = name.toLowerCase();

    return this.data.first.filter(
      option =>
        option.modalitate_acces.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFnSecond(tip?: SubTipEveniment): string | undefined {
    return tip ? tip.nume_categorie_sub_eveniment : undefined;
  }

  private _filterSecond(name: string): SubTipEveniment[] {
    const filterValue = name.toLowerCase();

    return this.data.second.filter(
      option =>
        option.nume_categorie_sub_eveniment.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SubmitForm(){

    if(this.localForm.valid){

      let tipAcces: TipAcces = new TipAcces(this.localForm.controls["tip_acces"].value);
      let tipSubEveniment: SubTipEveniment = new SubTipEveniment(this.localForm.controls["tip_sub_eveniment"].value);

      if(tipAcces && tipSubEveniment){

        this.data.model.id_acces = tipAcces.id_acces;
        this.data.model.modalitate_acces = tipAcces.modalitate_acces;
        this.data.model.id_sub_eveniment = tipSubEveniment.id_sub_eveniment;
        this.data.model.nume_categorie_sub_eveniment = tipSubEveniment.nume_categorie_sub_eveniment;

        this.dialogRef.close(this.data.model);

      }else{

      }

    }

  }
}
