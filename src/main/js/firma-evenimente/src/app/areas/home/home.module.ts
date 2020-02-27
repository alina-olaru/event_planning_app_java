import { SharedModule } from './../../modules/shared/shared.module';
import { TruncatePipe } from './../../modules/pipes/truncate.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewEventComponent } from './new-event/new-event.component';
import { SeeDetailsComponent } from './new-event/see-details/see-details.component';



@NgModule({
  declarations: [LayoutComponent, WelcomeComponent, NewEventComponent, SeeDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule,
    FontAwesomeModule,
    SharedModule
  ],
  entryComponents: [
    SeeDetailsComponent
  ]
})
export class HomeModule { }
