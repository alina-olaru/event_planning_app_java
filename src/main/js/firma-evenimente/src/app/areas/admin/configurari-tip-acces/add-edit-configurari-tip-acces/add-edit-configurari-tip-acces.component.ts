import { TipAcces } from 'src/app/Models/admin/tip-acces';
import { Component, OnInit, Inject } from '@angular/core';
import { ConfigurariTipAcces } from 'src/app/Models/admin/configurari-tip-acces';
import { TipMomentArtistic } from 'src/app/Models/admin/tip-moment-artistic';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';


interface Data {
  type: string;
  model: ConfigurariTipAcces;
  dropdown: TipAcces[];
}

@Component({
  selector: 'app-add-edit-configurari-tip-acces',
  templateUrl: './add-edit-configurari-tip-acces.component.html',
  styleUrls: ['./add-edit-configurari-tip-acces.component.scss']
})
export class AddEditConfigurariTipAccesComponent implements OnInit {


  localForm: FormGroup;
  myControl = new FormControl();
  dropdownSelected: TipAcces;
  filteredOptions: Observable<TipAcces[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditConfigurariTipAccesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new ConfigurariTipAcces();
    } else {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_acces == this.data.model.id_acces
      )[0];
    }

    this.localForm = this.formBuilder.group({
      id_configurari_acces: [{ value: this.data.model.id_configurari_acces, disabled: true}],
      denumire_configurare_acces: [this.data.model.denumire_configurare_acces, Validators.required],
      cost_realizare: [this.data.model.cost_realizare, Validators.required],
      tip_acces: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls['tip_acces'].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipAcces): string | undefined {
    return tip ? tip.modalitate_acces : undefined;
  }

  private _filter(name: string): TipAcces[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option => option.modalitate_acces.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: ConfigurariTipAcces = new ConfigurariTipAcces(this.localForm.value);
      model.id_configurari_acces = this.data.model.id_configurari_acces;
      let tipMoment: TipAcces = new TipAcces(this.localForm.controls["tip_acces"].value);
      model.id_acces = tipMoment.id_acces;
      model.modalitate_acces = tipMoment.modalitate_acces;

      this.dialogRef.close(model);
    }
  }

}
