import { TipLocatie } from 'src/app/Models/admin/tip-locatie';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface Data {
  type: string;
  model: TipLocatie;
}


@Component({
  selector: 'app-add-edit-tip-locatie',
  templateUrl: './add-edit-tip-locatie.component.html',
  styleUrls: ['./add-edit-tip-locatie.component.scss']
})
export class AddEditTipLocatieComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipLocatieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new TipLocatie();
    }else
    {
      if(this.data.model.imagine_tip_locatie)
       {
        this.fileName = this.data.model.nume_categorie_locatie;
        this.base64 = this.data.model.imagine_tip_locatie_src;
       }
    }

    this.localForm = this.formBuilder.group({
      id_tip_locatie: [{ value: this.data.model.id_tip_locatie, disabled: true}],
      nume_categorie_locatie: [this.data.model.nume_categorie_locatie, Validators.required],
      descriere: [this.data.model.descriere]
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
                  this.data.model.imagine_tip_locatie = <string>myReader.result;
                  this.data.model.imagine_tip_locatie_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_tip_locatie = null;
    this.data.model.imagine_tip_locatie_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: TipLocatie = new TipLocatie(this.localForm.value);
      model.id_tip_locatie = this.data.model.id_tip_locatie;
      model.imagine_tip_locatie = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_tip_locatie_src = this.base64;
      this.dialogRef.close(model);
    }
  }

}
