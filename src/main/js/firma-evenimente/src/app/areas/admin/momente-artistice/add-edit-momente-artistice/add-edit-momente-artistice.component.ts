import { TipMomentArtistic } from './../../../../Models/admin/tip-moment-artistic';
import { MomenteArtistice } from './../../../../Models/admin/momente-artistice';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

interface Data {
  type: string;
  model: MomenteArtistice;
  dropdown: TipMomentArtistic[];
}


@Component({
  selector: 'app-add-edit-momente-artistice',
  templateUrl: './add-edit-momente-artistice.component.html',
  styleUrls: ['./add-edit-momente-artistice.component.scss']
})
export class AddEditMomenteArtisticeComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  dropdownSelected: TipMomentArtistic;
  filteredOptions: Observable<TipMomentArtistic[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditMomenteArtisticeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new MomenteArtistice();
    } else {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_tip_moment == this.data.model.id_tip_moment
      )[0];
    }

    this.localForm = this.formBuilder.group({
      id_moment_artistic: [{ value: this.data.model.id_moment_artistic, disabled: true}],
      nume_tip_moment_artistic: [this.data.model.nume_tip_moment_artistic, Validators.required],
      timp_moment: [this.data.model.timp_moment],
      pret_per_moment: [this.data.model.pret_per_moment, Validators.required],
      numar_persoane_implicate: [this.data.model.numar_persoane_implicate],
      tip_moment: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls["tip_moment"].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipMomentArtistic): string | undefined {
    return tip ? tip.nume_categorie_moment_artistic : undefined;
  }

  private _filter(name: string): TipMomentArtistic[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option => option.nume_categorie_moment_artistic.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: MomenteArtistice = new MomenteArtistice(this.localForm.value);
      model.id_moment_artistic = this.data.model.id_moment_artistic;
      let tipMoment: TipMomentArtistic = new TipMomentArtistic(this.localForm.controls["tip_moment"].value);
      model.id_tip_moment = tipMoment.id_tip_moment;
      model.nume_categorie_moment_artistic = tipMoment.nume_categorie_moment_artistic;

      this.dialogRef.close(model);
    }
  }
}
