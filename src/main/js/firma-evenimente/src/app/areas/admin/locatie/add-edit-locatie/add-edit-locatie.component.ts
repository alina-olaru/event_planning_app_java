import { Component, OnInit, Inject } from '@angular/core';
import { Locatie } from 'src/app/Models/admin/locatie';
import { SubLocatie } from 'src/app/Models/admin/sub-locatie';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

interface Data {
  type: string;
  model: Locatie;
  dropdown: SubLocatie[];
}

@Component({
  selector: 'app-add-edit-locatie',
  templateUrl: './add-edit-locatie.component.html',
  styleUrls: ['./add-edit-locatie.component.scss']
})
export class AddEditLocatieComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  dropdownSelected: SubLocatie;
  filteredOptions: Observable<SubLocatie[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditLocatieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new Locatie();
    }
    else
    {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_sub_locatie == this.data.model.id_sub_locatie
      )[0];
      if(this.data.model.imagine_locatie)
        {
          this.fileName = this.data.model.nume_locatie;
          this.base64 = this.data.model.imagine_locatie_src;
        }
    }

    this.localForm = this.formBuilder.group({
      id_locatie: [{ value: this.data.model.id_locatie, disabled: true}],
      nume_locatie: [this.data.model.nume_locatie, Validators.required],
      tara: [this.data.model.tara, Validators.required],
      oras: [this.data.model.oras, Validators.required],
      adresa: [this.data.model.adresa, Validators.required],
      strada: [this.data.model.strada, Validators.required],
      dimensiune_mp: [this.data.model.dimensiune_mp],
      capacitate_maxima: [this.data.model.capacitate_maxima],
      pret_inchiriere_per_24h: [this.data.model.pret_inchiriere_per_24h, Validators.required],
      sub_locatie: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls["sub_locatie"].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: SubLocatie): string | undefined {
    return tip ? tip.nume_categorie_tip_locatie : undefined;
  }

  private _filter(name: string): SubLocatie[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option => option.nume_categorie_tip_locatie.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  UploadFile(){
    const fileUpload = document.getElementById('modal-file-upload-input') as HTMLInputElement;
    fileUpload.onchange = () => {
          for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                var myReader:FileReader = new FileReader();
                this.fileName = file.name;
                myReader.onloadend = (e) => {
                  console.log(myReader.result);
                  this.data.model.imagine_locatie = <string>myReader.result;
                  this.data.model.imagine_locatie_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_locatie = null;
    this.data.model.imagine_locatie_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: Locatie = new Locatie(this.localForm.value);
      model.id_locatie = this.data.model.id_locatie;
      model.imagine_locatie = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_locatie_src = this.base64;
      let tipLocatie: SubLocatie = new SubLocatie(this.localForm.controls["sub_locatie"].value);
      model.id_sub_locatie = tipLocatie.id_sub_locatie;
      model.nume_categorie_tip_locatie = tipLocatie.nume_categorie_tip_locatie;
      this.dialogRef.close(model);
    }
  }

}
