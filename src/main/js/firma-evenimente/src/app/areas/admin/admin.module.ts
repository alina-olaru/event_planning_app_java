import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryModule } from '@ngx-gallery/core';
import { TitleService } from './services/title.service';
import { MaterialModule } from './../../modules/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TipUtilizatoriComponent } from './tip-utilizatori/tip-utilizatori.component';
import { UtilizatoriComponent } from './utilizatori/utilizatori.component';
import { AddEditTipUtilizatoriComponent } from './tip-utilizatori/add-edit-tip-utilizatori/add-edit-tip-utilizatori.component';
import { AddEditUtilizatoriComponent } from './utilizatori/add-edit-utilizatori/add-edit-utilizatori.component';
import { BauturaComponent } from './bautura/bautura.component';
import { AddEditBauturaComponent } from './bautura/add-edit-bautura/add-edit-bautura.component';
import { ElementeDesignComponent } from './elemente-design/elemente-design.component';
import { AddEditElementeDesignComponent } from './elemente-design/add-edit-elemente-design/add-edit-elemente-design.component';
import { TipLocatieComponent } from './tip-locatie/tip-locatie.component';
import { AddEditTipLocatieComponent } from './tip-locatie/add-edit-tip-locatie/add-edit-tip-locatie.component';
import { AddEditLocatieComponent } from './locatie/add-edit-locatie/add-edit-locatie.component';
import {LocatieComponent} from './locatie/locatie.component';
import { SubLocatieComponent } from './sub-locatie/sub-locatie.component';
import { AddEditSubLocatieComponent } from './sub-locatie/add-edit-sub-locatie/add-edit-sub-locatie.component';
import { TipMediaComponent } from './tip-media/tip-media.component';
import { AddEditTipMediaComponent } from './tip-media/add-edit-tip-media/add-edit-tip-media.component';
import { MediaComponent } from './media/media.component';
import { AddEditMediaComponent } from './media/add-edit-media/add-edit-media.component';
import { AddEditTipMomentArtisticComponent } from './tip-moment-artistic/add-edit-tip-moment-artistic/add-edit-tip-moment-artistic.component';
import { TipMomentArtisticComponent } from './tip-moment-artistic/tip-moment-artistic.component';
import { MomenteArtisticeComponent } from './momente-artistice/momente-artistice.component';
import { AddEditMomenteArtisticeComponent } from './momente-artistice/add-edit-momente-artistice/add-edit-momente-artistice.component';
import { TipServireMeniuComponent } from './tip-servire-meniu/tip-servire-meniu.component';
import { AddEditTipServireMeniuComponent } from './tip-servire-meniu/add-edit-tip-servire-meniu/add-edit-tip-servire-meniu.component';
import { TipMeniuComponent } from './tip-meniu/tip-meniu.component';
import { AddEditTipMeniuComponent } from './tip-meniu/add-edit-tip-meniu/add-edit-tip-meniu.component';
import { ComponentaMeniuComponent } from './componenta-meniu/componenta-meniu.component';
import { AddEditComponentaMeniuComponent } from './componenta-meniu/add-edit-componenta-meniu/add-edit-componenta-meniu.component';
import { TipEvenimentComponent } from './tip-eveniment/tip-eveniment.component';
import { AddEditTipEvenimentComponent } from './tip-eveniment/add-edit-tip-eveniment/add-edit-tip-eveniment.component';
import { SubTipEvenimentComponent } from './sub-tip-eveniment/sub-tip-eveniment.component';
import { AddEditSubTipEvenimentComponent } from './sub-tip-eveniment/add-edit-sub-tip-eveniment/add-edit-sub-tip-eveniment.component';
import { TipAccesComponent } from './tip-acces/tip-acces.component';
import { AddEditTipAccesComponent } from './tip-acces/add-edit-tip-acces/add-edit-tip-acces.component';
import { ConfigurariTipAccesComponent } from './configurari-tip-acces/configurari-tip-acces.component';
import { AddEditConfigurariTipAccesComponent } from './configurari-tip-acces/add-edit-configurari-tip-acces/add-edit-configurari-tip-acces.component';
import { TipAccesSubEvenimentComponent } from './tip-acces-sub-eveniment/tip-acces-sub-eveniment.component';
import { AddEditTipAccesSubEvenimentComponent } from './tip-acces-sub-eveniment/add-edit-tip-acces-sub-eveniment/add-edit-tip-acces-sub-eveniment.component';
import { TipLocatieSubEvenimentComponent } from './tip-locatie-sub-eveniment/tip-locatie-sub-eveniment.component';
import { AddEditTipLocatieSubEvenimentComponent } from './tip-locatie-sub-eveniment/add-edit-tip-locatie-sub-eveniment/add-edit-tip-locatie-sub-eveniment.component';
import { OrganizatoriComponent } from './organizatori/organizatori.component';
import { AddEditOrganizatoriComponent } from './organizatori/add-edit-organizatori/add-edit-organizatori.component';
@NgModule({
  declarations: [
    SidebarComponent,
    TipUtilizatoriComponent,
    UtilizatoriComponent,
    AddEditTipUtilizatoriComponent,
    AddEditUtilizatoriComponent,
    BauturaComponent,
    AddEditBauturaComponent,
    ElementeDesignComponent,
    AddEditElementeDesignComponent,
    TipLocatieComponent,
    AddEditTipLocatieComponent,
    AddEditLocatieComponent,
    LocatieComponent,
    SubLocatieComponent,
    AddEditSubLocatieComponent,
    TipMediaComponent,
    AddEditTipMediaComponent,
    MediaComponent,
    AddEditMediaComponent,
    TipMomentArtisticComponent,
    AddEditTipMomentArtisticComponent,
    MomenteArtisticeComponent,
    AddEditMomenteArtisticeComponent,
    TipServireMeniuComponent,
    AddEditTipServireMeniuComponent,
    TipMeniuComponent,
    AddEditTipMeniuComponent,
    ComponentaMeniuComponent,
    AddEditComponentaMeniuComponent,
    TipEvenimentComponent,
    AddEditTipEvenimentComponent,
    SubTipEvenimentComponent,
    AddEditSubTipEvenimentComponent,
    TipAccesComponent,
    AddEditTipAccesComponent,
    ConfigurariTipAccesComponent,
    AddEditConfigurariTipAccesComponent,
    TipAccesSubEvenimentComponent,
    AddEditTipAccesSubEvenimentComponent,
    TipLocatieSubEvenimentComponent,
    AddEditTipLocatieSubEvenimentComponent,
    OrganizatoriComponent,
    AddEditOrganizatoriComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule,
    FontAwesomeModule
  ],
  providers: [TitleService],
  entryComponents: [
    AddEditTipUtilizatoriComponent,
    AddEditUtilizatoriComponent,
    AddEditBauturaComponent,
    AddEditElementeDesignComponent,
    AddEditTipLocatieComponent,
    AddEditSubLocatieComponent,
    AddEditLocatieComponent,
    AddEditTipMediaComponent,
    AddEditMediaComponent,
    AddEditTipMomentArtisticComponent,
    AddEditMomenteArtisticeComponent,
    AddEditTipServireMeniuComponent,
    AddEditTipMeniuComponent,
    AddEditComponentaMeniuComponent,
    AddEditTipEvenimentComponent,
    AddEditSubTipEvenimentComponent,
    AddEditTipAccesComponent,
    AddEditConfigurariTipAccesComponent,
    AddEditTipAccesSubEvenimentComponent,
    AddEditTipLocatieSubEvenimentComponent,
    AddEditOrganizatoriComponent
  ]
})
export class AdminModule {}
