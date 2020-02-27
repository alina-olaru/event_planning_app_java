import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizatorRoutingModule } from './organizator-routing.module';
import { UsersComponent } from './users/users.component';
import { AddEditUsersComponent } from './users/add-edit-users/add-edit-users.component';
import { LayoutUsersComponent } from './layout-users/layout-users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [UsersComponent, AddEditUsersComponent, LayoutUsersComponent],
  imports: [
    CommonModule,
    OrganizatorRoutingModule,
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
  entryComponents: [AddEditUsersComponent]
})
export class OrganizatorModule { }
