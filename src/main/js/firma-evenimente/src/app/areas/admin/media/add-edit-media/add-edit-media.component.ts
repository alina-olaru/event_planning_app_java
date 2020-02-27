import { TipMedia } from './../../../../Models/admin/tip-media';
import { Component, OnInit, Inject } from '@angular/core';
import { Media } from 'src/app/Models/admin/media';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';


interface Data {
  type: string;
  model: Media;
  dropdown: TipMedia[];
}

@Component({
  selector: 'app-add-edit-media',
  templateUrl: './add-edit-media.component.html',
  styleUrls: ['./add-edit-media.component.scss']
})
export class AddEditMediaComponent implements OnInit {

  localForm: FormGroup;
  myControl = new FormControl();
  fileName: string;
  base64: string;
  dropdownSelected: TipMedia;
  filteredOptions: Observable<TipMedia[]>;
  constructor(
    public dialogRef: MatDialogRef<AddEditMediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.model == null || this.data.model == undefined) {
      this.data.model = new Media();
    }
    else
    {
      this.dropdownSelected = this.data.dropdown.filter(
        e => e.id_tip_media == this.data.model.id_tip_media
      )[0];
      if(this.data.model.imagine_media)
        {
          this.fileName = this.data.model.nume_media;
          this.base64 = this.data.model.imagine_media_src;
        }
    }

    this.localForm = this.formBuilder.group({
      id_media: [{ value: this.data.model.id_media, disabled: true}],
      denumire: [this.data.model.denumire, Validators.required],
      pret: [this.data.model.pret, Validators.required],
      descriere: [this.data.model.descriere],
      tip_media: [this.dropdownSelected, Validators.required]
    });

    this.filteredOptions = this.localForm.controls["tip_media"].valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.data.dropdown.slice()))
    );
  }

  get form() {
    return this.localForm.controls;
  }

  displayFn(tip?: TipMedia): string | undefined {
    return tip ? tip.nume_media : undefined;
  }

  private _filter(name: string): TipMedia[] {
    const filterValue = name.toLowerCase();

    return this.data.dropdown.filter(
      option => option.nume_media.toLowerCase().indexOf(filterValue) === 0
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
                  this.data.model.imagine_media = <string>myReader.result;
                  this.data.model.imagine_media_src = myReader.result;
                  this.base64 = <string>myReader.result;
                }
                myReader.readAsDataURL(file);
          }
    };
    fileUpload.click();
  }

  DeleteFile(){
    this.fileName = null;
    this.data.model.imagine_media = null;
    this.data.model.imagine_media_src = null;
    this.base64 = null;
  }

  SubmitForm(){
    if(this.localForm.valid){
      console.log(this.localForm.value);
      let model: Media = new Media(this.localForm.value);
      model.id_media = this.data.model.id_media;
      model.imagine_media = this.base64 ? this.base64.replace(/^data:image\/[a-z]+;base64,/, "") : null;
      model.imagine_media_src = this.base64;
      let tipMedia: TipMedia = new TipMedia(this.localForm.controls["tip_media"].value);
      model.id_tip_media = tipMedia.id_tip_media;
      model.nume_media = tipMedia.nume_media;
      this.dialogRef.close(model);
    }
  }
}
