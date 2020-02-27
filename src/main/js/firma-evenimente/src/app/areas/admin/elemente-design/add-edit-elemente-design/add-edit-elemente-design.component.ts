import { ElementeDesign } from 'src/app/Models/admin/elemente-design';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface Data {
  type: string;
  model: ElementeDesign;
}

@Component({
  selector: 'app-add-edit-elemente-design',
  templateUrl: './add-edit-elemente-design.component.html',
  styleUrls: ['./add-edit-elemente-design.component.scss']
})
export class AddEditElementeDesignComponent implements OnInit {


  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  constructor(
    public dialogRef: MatDialogRef<AddEditElementeDesignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new ElementeDesign();
    }else
    {
      if(this.data.model.imagine_element_design){
        this.fileName = this.data.model.nume_element;
        this.base64 = this.data.model.imagine_element_design_src;
      }
    }

    this.localForm = this.formBuilder.group({
      id_element_design: [{ value: this.data.model.id_element_design, disabled: true}],
      nume_element: [this.data.model.nume_element, Validators.required],
      culoare: [this.data.model.culoare, Validators.required],
      cantitate: [this.data.model.cantitate, Validators.required],
      dimensiuni: [this.data.model.dimensiuni, [Validators.required]],
      pret_per_element: [this.data.model.pret_per_element, Validators.required],
      discount: [this.data.model.discount],
      numar_minim_elemente_pentru_reducere: [this.data.model.numar_minim_elemente_pentru_reducere]
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
                  this.data.model.imagine_element_design = <string>myReader.result;
                  this.data.model.imagine_element_design_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_element_design = null;
    this.data.model.imagine_element_design_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: ElementeDesign = new ElementeDesign(this.localForm.value);
      model.id_element_design = this.data.model.id_element_design;
      model.imagine_element_design = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_element_design_src = this.base64;
      this.dialogRef.close(model);
    }
  }

}
