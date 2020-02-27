import { TipMeniu } from './../../../../Models/admin/tip-meniu';
import { Component, OnInit, Inject } from '@angular/core';
import { ComponentaMeniu } from 'src/app/Models/admin/componenta-meniu';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

interface Data {
  type: string;
  model: ComponentaMeniu;
  dropdown: TipMeniu[];
}

@Component({
  selector: 'app-add-edit-componenta-meniu',
  templateUrl: './add-edit-componenta-meniu.component.html',
  styleUrls: ['./add-edit-componenta-meniu.component.scss']
})
export class AddEditComponentaMeniuComponent implements OnInit {


  localForm: FormGroup;
  myControl = new FormControl();
  dropdownSelected: TipMeniu;
  filteredOptions: Observable<TipMeniu[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditComponentaMeniuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new ComponentaMeniu();
    } else {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_tip_meniu == this.data.model.id_tip_meniu
      )[0];
    }

    this.localForm = this.formBuilder.group({
      id_preparat: [{ value: this.data.model.id_preparat, disabled: true}],
      nume_preparat: [this.data.model.nume_preparat, Validators.required],
      cantitate: [this.data.model.cantitate, Validators.required],
      alergeni: [this.data.model.alergeni],
      tip_meniu: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls["tip_meniu"].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipMeniu): string | undefined {
    return tip ? tip.nume_meniu : undefined;
  }

  private _filter(name: string): TipMeniu[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option => option.nume_meniu.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: ComponentaMeniu = new ComponentaMeniu(this.localForm.value);
      model.id_preparat = this.data.model.id_preparat;
      let tipMeniu: TipMeniu = new TipMeniu(this.localForm.controls["tip_meniu"].value);
      model.id_tip_meniu = tipMeniu.id_tip_meniu;
      model.nume_meniu = tipMeniu.nume_meniu;

      this.dialogRef.close(model);
    }
  }
}
