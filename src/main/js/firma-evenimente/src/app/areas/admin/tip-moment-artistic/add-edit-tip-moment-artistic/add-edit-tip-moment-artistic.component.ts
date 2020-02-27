import { Component, OnInit, Inject } from '@angular/core';
import { TipMomentArtistic } from 'src/app/Models/admin/tip-moment-artistic';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface Data {
  type: string;
  model: TipMomentArtistic;
}

@Component({
  selector: 'app-add-edit-tip-moment-artistic',
  templateUrl: './add-edit-tip-moment-artistic.component.html',
  styleUrls: ['./add-edit-tip-moment-artistic.component.scss']
})
export class AddEditTipMomentArtisticComponent implements OnInit {


  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipMomentArtisticComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new TipMomentArtistic();
    }else
    {
      if(this.data.model.imagine_tip_moment_artistic)
       {
         console.log(this.data.model);
        this.fileName = this.data.model.nume_categorie_moment_artistic;
        this.base64 = this.data.model.imagine_tip_moment_artistic_src;
       }
    }

    this.localForm = this.formBuilder.group({
      id_tip_moment: [{ value: this.data.model.id_tip_moment, disabled: true}],
      nume_categorie_moment_artistic: [this.data.model.nume_categorie_moment_artistic, Validators.required]
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
                  this.data.model.imagine_tip_moment_artistic = <string>myReader.result;
                  this.data.model.imagine_tip_moment_artistic_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_tip_moment_artistic = null;
    this.data.model.imagine_tip_moment_artistic_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: TipMomentArtistic = new TipMomentArtistic(this.localForm.value);
      model.id_tip_moment = this.data.model.id_tip_moment;
      console.log(this.base64);
      model.imagine_tip_moment_artistic = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_tip_moment_artistic_src = this.base64;
      this.dialogRef.close(model);
    }
  }

}
