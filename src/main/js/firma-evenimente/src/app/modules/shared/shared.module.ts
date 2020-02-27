import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';



@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule,
    NgxMaterialTimepickerModule.setLocale("ro-RO")
  ],
  exports: [TruncatePipe, NgxMaterialTimepickerModule]
})
export class SharedModule { }
