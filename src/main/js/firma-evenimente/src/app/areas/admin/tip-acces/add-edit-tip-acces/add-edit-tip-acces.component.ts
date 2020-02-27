import { Component, OnInit, Inject } from '@angular/core';
import { TipAcces } from 'src/app/Models/admin/tip-acces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


interface Data {
  type: string;
  model: TipAcces;
}


@Component({
  selector: 'app-add-edit-tip-acces',
  templateUrl: './add-edit-tip-acces.component.html',
  styleUrls: ['./add-edit-tip-acces.component.scss']
})
export class AddEditTipAccesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditTipAccesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

ngOnInit() {

    if (this.data.model == null || this.data.model == undefined) {
        this.data.model = new TipAcces();
    }

}

onNoClick(): void {
    this.dialogRef.close();
}

}
