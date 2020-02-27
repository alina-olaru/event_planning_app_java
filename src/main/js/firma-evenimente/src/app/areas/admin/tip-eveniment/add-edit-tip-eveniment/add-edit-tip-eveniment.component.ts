import { Component, OnInit, Inject } from '@angular/core';
import { TipEveniment } from 'src/app/Models/admin/tip-eveniment';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface Data {
  type: string;
  model: TipEveniment;
}
@Component({
  selector: 'app-add-edit-tip-eveniment',
  templateUrl: './add-edit-tip-eveniment.component.html',
  styleUrls: ['./add-edit-tip-eveniment.component.scss']
})
export class AddEditTipEvenimentComponent implements OnInit {


  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipEvenimentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new TipEveniment();
    }else
    {
      if(this.data.model.imagine_tip_eveniment)
       {
         console.log(this.data.model);
        this.fileName = this.data.model.nume_categorie_eveniment;
        this.base64 = this.data.model.imagine_tip_eveniment_src as string;
       }
    }

    this.localForm = this.formBuilder.group({
      id_tip_eveniment: [{ value: this.data.model.id_tip_eveniment, disabled: true}],
      nume_categorie_eveniment: [this.data.model.nume_categorie_eveniment, Validators.required]
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
                  this.data.model.imagine_tip_eveniment = <string>myReader.result;
                  this.data.model.imagine_tip_eveniment_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_tip_eveniment = null;
    this.data.model.imagine_tip_eveniment_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: TipEveniment = new TipEveniment(this.localForm.value);
      model.id_tip_eveniment = this.data.model.id_tip_eveniment;
      model.numar_evenimente_organizate_per_categorie = this.data.model.numar_evenimente_organizate_per_categorie;
      console.log(this.base64);
      if(typeof(this.base64) == typeof(""))
        model.imagine_tip_eveniment = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      else
        model.imagine_tip_eveniment = this.base64 ? (this.base64 as any).changingThisBreaksApplicationSecurity.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_tip_eveniment_src = this.base64;
      this.dialogRef.close(model);
    }
  }

}
