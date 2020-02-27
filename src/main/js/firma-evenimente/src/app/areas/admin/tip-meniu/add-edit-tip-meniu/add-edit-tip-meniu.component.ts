import { TipServireMeniu } from './../../../../Models/admin/tip-servire-meniu';
import { Component, OnInit, Inject } from '@angular/core';
import { TipMeniu } from 'src/app/Models/admin/tip-meniu';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

interface Data {
  type: string;
  model: TipMeniu;
  dropdown: TipServireMeniu[];
}
@Component({
  selector: 'app-add-edit-tip-meniu',
  templateUrl: './add-edit-tip-meniu.component.html',
  styleUrls: ['./add-edit-tip-meniu.component.scss']
})
export class AddEditTipMeniuComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  dropdownSelected: TipServireMeniu;
  filteredOptions: Observable<TipServireMeniu[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditTipMeniuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new TipMeniu();
    }
    else
    {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_tip_servire_meniu == this.data.model.id_tip_servire_meniu
      )[0];
      if(this.data.model.imagine_meniu)
        {
          this.fileName = this.data.model.nume_meniu;
          this.base64 = this.data.model.imagine_meniu_src;
        }
    }

    this.localForm = this.formBuilder.group({
      id_tip_meniu: [{ value: this.data.model.id_tip_meniu, disabled: true}],
      nume_meniu: [this.data.model.nume_meniu, Validators.required],
      cost_tip_meniu: [this.data.model.cost_tip_meniu, Validators.required],
      clienti_targetati: [this.data.model.clienti_targetati],
      reducere: [this.data.model.reducere],
      minim_portii_pentru_reducere: [this.data.model.minim_portii_pentru_reducere],
      tip_servire_meniu: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls["tip_servire_meniu"].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipServireMeniu): string | undefined {
    return tip ? tip.denumire_tip_servire : undefined;
  }

  private _filter(name: string): TipServireMeniu[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option => option.denumire_tip_servire.toLowerCase().indexOf(filterValue) === 0
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
                  this.data.model.imagine_meniu = <string>myReader.result;
                  this.data.model.imagine_meniu_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_meniu = null;
    this.data.model.imagine_meniu_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: TipMeniu = new TipMeniu(this.localForm.value);
      model.id_tip_meniu = this.data.model.id_tip_meniu;
      if(typeof(this.base64) == typeof(""))
        model.imagine_meniu = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      else
      model.imagine_meniu = this.base64 ? (this.base64 as any).changingThisBreaksApplicationSecurity.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_meniu_src = this.base64;
      let tipTipMeniu: TipServireMeniu = new TipServireMeniu(this.localForm.controls["tip_servire_meniu"].value);
      model.id_tip_servire_meniu = tipTipMeniu.id_tip_servire_meniu;
      model.denumire_tip_servire = tipTipMeniu.denumire_tip_servire;
      this.dialogRef.close(model);
    }
  }
}
