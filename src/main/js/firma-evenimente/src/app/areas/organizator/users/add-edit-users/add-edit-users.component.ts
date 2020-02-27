import { Component, OnInit, Inject } from '@angular/core';
import { Utilizator } from 'src/app/Models/admin/utilizator';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddEditUtilizatoriComponent } from 'src/app/areas/admin/utilizatori/add-edit-utilizatori/add-edit-utilizatori.component';

interface Data {
  type: string;
  model: Utilizator;
}

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<AddEditUtilizatoriComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new Utilizator();
    } else {

    }

    this.localForm = this.formBuilder.group({
      id_utilizator: [{ value: this.data.model.id_utilizator, disabled: true}],
      nume: [this.data.model.nume, Validators.required],
      prenume: [this.data.model.prenume, Validators.required],
      numar_telefon: [this.data.model.numar_telefon, Validators.required],
      adresa_mail: [this.data.model.adresa_mail, [Validators.email, Validators.required]],
      username: [this.data.model.username, Validators.required],
      parola: [this.data.model.parola, Validators.required],
    });


  }

  get form() {
    return this.localForm.controls;
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: Utilizator = new Utilizator(this.localForm.value);
      model.id_utilizator = this.data.model.id_utilizator;
      model.id_nivel_acces = 3;
      model.rol = "USER";
      this.dialogRef.close(model);
    }
  }
}
