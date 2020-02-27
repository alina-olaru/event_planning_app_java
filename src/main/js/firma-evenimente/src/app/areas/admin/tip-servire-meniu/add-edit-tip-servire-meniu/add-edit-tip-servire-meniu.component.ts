import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TipServireMeniu } from 'src/app/Models/admin/tip-servire-meniu';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


interface Data {
  type: string;
  model: TipServireMeniu;
}

@Component({
  selector: 'app-add-edit-tip-servire-meniu',
  templateUrl: './add-edit-tip-servire-meniu.component.html',
  styleUrls: ['./add-edit-tip-servire-meniu.component.scss']
})
export class AddEditTipServireMeniuComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipServireMeniuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new TipServireMeniu();
    }else
    {
      if(this.data.model.imagine_tip_servire)
       {
         console.log(this.data.model);
        this.fileName = this.data.model.denumire_tip_servire;
        this.base64 = this.data.model.imagine_tip_servire_src as string;
       }
    }

    this.localForm = this.formBuilder.group({
      id_tip_servire_meniu: [{ value: this.data.model.id_tip_servire_meniu, disabled: true}],
      denumire_tip_servire: [this.data.model.denumire_tip_servire, Validators.required]
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
                  this.data.model.imagine_tip_servire = <string>myReader.result;
                  this.data.model.imagine_tip_servire_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_tip_servire = null;
    this.data.model.imagine_tip_servire_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: TipServireMeniu = new TipServireMeniu(this.localForm.value);
      model.id_tip_servire_meniu = this.data.model.id_tip_servire_meniu;
      console.log(this.base64);
      if(typeof(this.base64) == typeof(""))
        model.imagine_tip_servire = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      else
      model.imagine_tip_servire = this.base64 ? (this.base64 as any).changingThisBreaksApplicationSecurity.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_tip_servire_src = this.base64;
      this.dialogRef.close(model);
    }
  }


}
