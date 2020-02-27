import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipMedia } from 'src/app/Models/admin/tip-media';

interface Data {
  type: string;
  model: TipMedia;
}


@Component({
  selector: 'app-add-edit-tip-media',
  templateUrl: './add-edit-tip-media.component.html',
  styleUrls: ['./add-edit-tip-media.component.scss']
})
export class AddEditTipMediaComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipMediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new TipMedia();
    }else
    {
      if(this.data.model.imagine_tip_media)
       {
         console.log(this.data.model);
        this.fileName = this.data.model.nume_media;
        this.base64 = this.data.model.imagine_tip_media_src;
       }
    }

    this.localForm = this.formBuilder.group({
      id_tip_media: [{ value: this.data.model.id_tip_media, disabled: true}],
      nume_media: [this.data.model.nume_media, Validators.required]
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
                  this.data.model.imagine_tip_media = <string>myReader.result;
                  this.data.model.imagine_tip_media_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_tip_media = null;
    this.data.model.imagine_tip_media_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: TipMedia = new TipMedia(this.localForm.value);
      model.id_tip_media = this.data.model.id_tip_media;
      console.log(this.base64);
      model.imagine_tip_media = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_tip_media_src = this.base64;
      this.dialogRef.close(model);
    }
  }

}
