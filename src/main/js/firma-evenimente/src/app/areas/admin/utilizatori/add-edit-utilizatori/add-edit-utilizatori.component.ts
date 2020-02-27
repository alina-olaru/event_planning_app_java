import { TipUtilizator } from "src/app/Models/admin/tip-utilizator";
import { Utilizator } from "./../../../../Models/admin/utilizator";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from "rxjs";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { startWith, map } from "rxjs/operators";

interface Data {
  type: string;
  model: Utilizator;
  roluri: TipUtilizator[];
}

@Component({
  selector: "app-add-edit-utilizatori",
  templateUrl: "./add-edit-utilizatori.component.html",
  styleUrls: ["./add-edit-utilizatori.component.scss"]
})
export class AddEditUtilizatoriComponent implements OnInit {
  localForm: FormGroup;
  myControl = new FormControl();
  rolSelectat: TipUtilizator;
  filteredOptions: Observable<TipUtilizator[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditUtilizatoriComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new Utilizator();
    } else {
      this.rolSelectat = this.data.roluri.filter(
        e => e.id_nivel_acces == this.data.model.id_nivel_acces
      )[0];
    }

    this.localForm = this.formBuilder.group({
      id_utilizator: [{ value: this.data.model.id_utilizator, disabled: true}],
      nume: [this.data.model.nume, Validators.required],
      prenume: [this.data.model.prenume, Validators.required],
      numar_telefon: [this.data.model.numar_telefon, Validators.required],
      adresa_mail: [this.data.model.adresa_mail, [Validators.email, Validators.required]],
      username: [this.data.model.username, Validators.required],
      parola: [this.data.model.parola, Validators.required],
      rol: [this.rolSelectat, Validators.required]
    });

    this.filteredOptions = this.localForm.controls["rol"].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.roluri.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipUtilizator): string | undefined {
    return tip ? tip.rol : undefined;
  }

  private _filter(name: string): TipUtilizator[] {
    const filterValue = name.toLowerCase();

    return this.data.roluri.filter(
      option => option.rol.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: Utilizator = new Utilizator(this.localForm.value);
      model.id_utilizator = this.data.model.id_utilizator;
      model.id_nivel_acces = (model.rol as any).id_nivel_acces;
      model.rol = (model.rol as any).rol;
      this.dialogRef.close(model);
    }
  }


}
