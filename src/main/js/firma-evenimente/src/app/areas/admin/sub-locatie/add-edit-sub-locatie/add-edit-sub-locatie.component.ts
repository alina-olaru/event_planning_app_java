import { TipLocatie } from 'src/app/Models/admin/tip-locatie';
import { SubLocatie } from 'src/app/Models/admin/sub-locatie';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface Data {
  type: string;
  model: SubLocatie;
  dropdown: TipLocatie[];
}

@Component({
  selector: 'app-add-edit-sub-locatie',
  templateUrl: './add-edit-sub-locatie.component.html',
  styleUrls: ['./add-edit-sub-locatie.component.scss']
})
export class AddEditSubLocatieComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  dropdownSelected: TipLocatie;
  filteredOptions: Observable<TipLocatie[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditSubLocatieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new SubLocatie();
    }else
    {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_tip_locatie == this.data.model.id_tip_locatie
      )[0];
      if(this.data.model.imagine_sub_locatie)
        {
          this.fileName = this.data.model.nume_categorie_tip_locatie;
          this.base64 = this.data.model.imagine_sub_locatie_src;
        }
    }

    this.localForm = this.formBuilder.group({
      id_sub_locatie: [{ value: this.data.model.id_sub_locatie, disabled: true}],
      nume_categorie_tip_locatie: [this.data.model.nume_categorie_tip_locatie, Validators.required],
      anotimp_potrivit: [this.data.model.anotimp_potrivit],
      tip_locatie: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls["tip_locatie"].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipLocatie): string | undefined {
    return tip ? tip.nume_categorie_locatie : undefined;
  }

  private _filter(name: string): TipLocatie[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option => option.nume_categorie_locatie.toLowerCase().indexOf(filterValue) === 0
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
                  this.data.model.imagine_sub_locatie = <string>myReader.result;
                  this.data.model.imagine_sub_locatie_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_sub_locatie = null;
    this.data.model.imagine_sub_locatie_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: SubLocatie = new SubLocatie(this.localForm.value);
      model.id_sub_locatie = this.data.model.id_sub_locatie;
      model.imagine_sub_locatie = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_sub_locatie_src = this.base64;
      let tipLocatie: TipLocatie = new TipLocatie(this.localForm.controls["tip_locatie"].value);
      model.id_tip_locatie = tipLocatie.id_tip_locatie;
      model.nume_tip_locatie = tipLocatie.nume_categorie_locatie;
      this.dialogRef.close(model);
    }
  }

}
