import { Component, OnInit, Inject } from '@angular/core';
import { TipLocatieSubEveniment } from 'src/app/Models/admin/tip-locatie-sub-eveniment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipLocatie } from 'src/app/Models/admin/tip-locatie';
import { SubTipEveniment } from 'src/app/Models/admin/sub-tip-eveniment';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

interface Data {
  type: string;
  model: TipLocatieSubEveniment;
  first: TipLocatie[];
  second: SubTipEveniment[];
}

@Component({
  selector: 'app-add-edit-tip-locatie-sub-eveniment',
  templateUrl: './add-edit-tip-locatie-sub-eveniment.component.html',
  styleUrls: ['./add-edit-tip-locatie-sub-eveniment.component.scss']
})
export class AddEditTipLocatieSubEvenimentComponent implements OnInit {

  model: TipLocatieSubEveniment;
  localForm: FormGroup;
  dropdownSelectedFirst: TipLocatie;
  dropdownSelectedSecond: SubTipEveniment;
  filteredOptionsFirst: Observable<TipLocatie[]>;
  filteredOptionsSecond: Observable<SubTipEveniment[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipLocatieSubEvenimentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.data.model = new TipLocatieSubEveniment();

    this.localForm = this.formBuilder.group({
      tip_locatie: [this.dropdownSelectedFirst, Validators.required],
      tip_sub_eveniment: [this.dropdownSelectedFirst, Validators.required],
    });

    this.filteredOptionsFirst = this.localForm.controls[
      "tip_locatie"
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

  displayFnFirst(tip?: TipLocatie): string | undefined {
    return tip ? tip.nume_categorie_locatie : undefined;
  }

  private _filterFirst(name: string): TipLocatie[] {
    const filterValue = name.toLowerCase();

    return this.data.first.filter(
      option =>
        option.nume_categorie_locatie.toLowerCase().indexOf(filterValue) === 0
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

      let tipLocatie: TipLocatie = new TipLocatie(this.localForm.controls["tip_locatie"].value);
      let tipSubEveniment: SubTipEveniment = new SubTipEveniment(this.localForm.controls["tip_sub_eveniment"].value);

      if(tipLocatie && tipSubEveniment){

        this.data.model.id_tip_locatie = tipLocatie.id_tip_locatie;
        this.data.model.nume_categorie_locatie = tipLocatie.nume_categorie_locatie;
        this.data.model.id_sub_eveniment = tipSubEveniment.id_sub_eveniment;
        this.data.model.nume_categorie_sub_eveniment = tipSubEveniment.nume_categorie_sub_eveniment;

        this.dialogRef.close(this.data.model);

      }else{

      }

    }

  }

}
