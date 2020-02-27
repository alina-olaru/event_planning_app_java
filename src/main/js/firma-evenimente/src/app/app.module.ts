import { SharedModule } from './modules/shared/shared.module';
import { LoadingService } from './modules/loading-spinner/loading.service';
import { RegisterService } from './areas/register/register.service';
import { LoginService } from './areas/login/login.service';
import { MaterialModule } from './modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './areas/login/login.component';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalVarService } from './services/global-var.service';
import { ToastrService } from './services/toastr.service';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './areas/register/register.component';
import { LoadingSpinnerComponent } from './modules/loading-spinner/loading-spinner.component';
import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';
import { GallerizeModule } from  '@ngx-gallery/gallerize';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from './modules/pipes/truncate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
   // FormGroup,
    FormBuilder,
    CookieService,
    Validators,
    GlobalVarService,
    ToastrService,
    LoginService,
    RegisterService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
