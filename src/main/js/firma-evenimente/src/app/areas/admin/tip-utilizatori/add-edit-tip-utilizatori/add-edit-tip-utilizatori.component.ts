import { TipUtilizator } from './../../../../Models/admin/tip-utilizator';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface Data {
  type: string;
  model: TipUtilizator;
}

@Component({
  selector: 'app-add-edit-tip-utilizatori',
  templateUrl: './add-edit-tip-utilizatori.component.html',
  styleUrls: ['./add-edit-tip-utilizatori.component.scss']
})
export class AddEditTipUtilizatoriComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditTipUtilizatoriComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

ngOnInit() {

    if (this.data.model == null || this.data.model == undefined) {
        this.data.model = new TipUtilizator();
    }

}

onNoClick(): void {
    this.dialogRef.close();
}
}
