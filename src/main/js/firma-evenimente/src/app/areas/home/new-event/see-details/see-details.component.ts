import { SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipUtilizator } from 'src/app/Models/admin/tip-utilizator';

interface Data {
  title: string;
  image: SafeResourceUrl;
  description: string;
}

@Component({
  selector: 'app-see-details',
  templateUrl: './see-details.component.html',
  styleUrls: ['./see-details.component.scss']
})
export class SeeDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

ngOnInit() {


}

onNoClick(): void {
    this.dialogRef.close();
}

}
