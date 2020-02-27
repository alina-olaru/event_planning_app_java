import { Component, OnInit, Inject } from '@angular/core';
import { TipEveniment } from 'src/app/Models/admin/tip-eveniment';
import { SubTipEveniment } from 'src/app/Models/admin/sub-tip-eveniment';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

interface Data {
  type: string;
  model: SubTipEveniment;
  dropdown: TipEveniment[];
}

@Component({
  selector: 'app-add-edit-sub-tip-eveniment',
  templateUrl: './add-edit-sub-tip-eveniment.component.html',
  styleUrls: ['./add-edit-sub-tip-eveniment.component.scss']
})
export class AddEditSubTipEvenimentComponent implements OnInit {
  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  dropdownSelected: TipEveniment;
  filteredOptions: Observable<TipEveniment[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditSubTipEvenimentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new SubTipEveniment();
    } else {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_tip_eveniment == this.data.model.id_tip_eveniment
      )[0];
      if (this.data.model.imagine_sub_eveniment) {
        this.fileName = this.data.model.nume_categorie_sub_eveniment;
        this.base64 = this.data.model.imagine_sub_eveniment_src;
      }
    }

    this.localForm = this.formBuilder.group({
      id_sub_eveniment: [
        { value: this.data.model.id_sub_eveniment, disabled: true }
      ],
      nume_categorie_sub_eveniment: [
        this.data.model.nume_categorie_sub_eveniment,
        Validators.required
      ],
      descriere: [this.data.model.descriere],
      tip_eveniment: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls[
      'tip_eveniment'
    ].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipEveniment): string | undefined {
    return tip ? tip.nume_categorie_eveniment : undefined;
  }

  private _filter(name: string): TipEveniment[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option =>
        option.nume_categorie_eveniment.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  UploadFile() {
    const fileUpload = document.getElementById(
      'modal-file-upload-input'
    ) as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        let myReader: FileReader = new FileReader();
        this.fileName = file.name;
        myReader.onloadend = e => {
          console.log(myReader.result);
          this.data.model.imagine_sub_eveniment =  myReader.result as string;
          this.data.model.imagine_sub_eveniment_src = myReader.result;
          this.base64 =  myReader.result as string;
        };
        myReader.readAsDataURL(file);
      }
    };
    fileUpload.click();
  }

  DeleteFile() {
    this.fileName = null;
    this.data.model.imagine_sub_eveniment = null;
    this.data.model.imagine_sub_eveniment_src = null;
    this.base64 = null;
  }

  SubmitForm() {
    if (this.localForm.valid) {
      console.log(this.localForm.value);
      const model: SubTipEveniment = new SubTipEveniment(this.localForm.value);
      model.id_sub_eveniment = this.data.model.id_sub_eveniment;

      if (typeof this.base64 == typeof '') {
        model.imagine_sub_eveniment = this.base64
          ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "")
          : null;
      }
      else {
        model.imagine_sub_eveniment = this.base64
          ? (this.base64 as any).changingThisBreaksApplicationSecurity.replace(
              /^data:image\/[a-z]+;base64,/,
              ""
            )
          : null;
      }

      model.imagine_sub_eveniment_src = this.base64;
      const tipLocatie: TipEveniment = new TipEveniment(
        this.localForm.controls['tip_eveniment'].value
      );
      model.id_tip_eveniment = tipLocatie.id_tip_eveniment;
      model.nume_categorie_eveniment = tipLocatie.nume_categorie_eveniment;
      this.dialogRef.close(model);
    }
  }
}
