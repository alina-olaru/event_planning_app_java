import { Bautura } from './../../../../Models/admin/bautura';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Utilizator } from 'src/app/Models/admin/utilizator';
import { startWith, map } from 'rxjs/operators';
import { TipUtilizator } from 'src/app/Models/admin/tip-utilizator';

interface Data {
  type: string;
  model: Bautura;
}

@Component({
  selector: 'app-add-edit-bautura',
  templateUrl: './add-edit-bautura.component.html',
  styleUrls: ['./add-edit-bautura.component.scss']
})
export class AddEditBauturaComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  constructor(
    public dialogRef: MatDialogRef<AddEditBauturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new Bautura();
    }else
    {
      if(this.data.model.imagine_bautura)
       {
         this.fileName = this.data.model.nume_bautura;
         this.base64 = this.data.model.imagine_bautura_src;
       }
    }

    this.localForm = this.formBuilder.group({
      id_bautura: [{ value: this.data.model.id_bautura, disabled: true}],
      nume_bautura: [this.data.model.nume_bautura, Validators.required],
      pret_pret_bucata: [this.data.model.pret_pret_bucata, Validators.required],
      pret_per_bax: [this.data.model.pret_per_bax, Validators.required],
      gramaj: [this.data.model.gramaj, [Validators.required]]
    });
  }

  get form() {
    return this.localForm.controls;
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
                  this.data.model.imagine_bautura = <string>myReader.result;
                  this.data.model.imagine_bautura_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_bautura = null;
    this.data.model.imagine_bautura_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: Bautura = new Bautura(this.localForm.value);
      model.id_bautura = this.data.model.id_bautura;
      model.imagine_bautura = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_bautura_src = this.base64;
      this.dialogRef.close(model);
    }
  }

}
