import { OrganizatoriComponent } from './organizatori/organizatori.component';
import { TipLocatieSubEvenimentComponent } from './tip-locatie-sub-eveniment/tip-locatie-sub-eveniment.component';
import { TipAccesSubEvenimentComponent } from './tip-acces-sub-eveniment/tip-acces-sub-eveniment.component';
import { ConfigurariTipAccesComponent } from './configurari-tip-acces/configurari-tip-acces.component';
import { TipAccesComponent } from './tip-acces/tip-acces.component';
import { SubTipEvenimentComponent } from './sub-tip-eveniment/sub-tip-eveniment.component';
import { TipEvenimentComponent } from './tip-eveniment/tip-eveniment.component';
import { ComponentaMeniuComponent } from './componenta-meniu/componenta-meniu.component';
import { TipMeniuComponent } from './tip-meniu/tip-meniu.component';
import { TipServireMeniuComponent } from './tip-servire-meniu/tip-servire-meniu.component';
import { MomenteArtisticeComponent } from './momente-artistice/momente-artistice.component';
import { TipMomentArtisticComponent } from './tip-moment-artistic/tip-moment-artistic.component';
import { TipMediaComponent } from './tip-media/tip-media.component';
import { SubLocatieComponent } from './sub-locatie/sub-locatie.component';

import { LocatieComponent } from './locatie/locatie.component';
import { TipLocatieComponent } from './tip-locatie/tip-locatie.component';
import { ElementeDesignComponent } from './elemente-design/elemente-design.component';
import { BauturaComponent } from './bautura/bautura.component';
import { UtilizatoriComponent } from './utilizatori/utilizatori.component';
import { TipUtilizatoriComponent } from "./tip-utilizatori/tip-utilizatori.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MediaComponent } from './media/media.component';

const routes: Routes = [
  {
    path: "",
    component: SidebarComponent,
    children: [
      {
        path: "",
        redirectTo: "tip-utilizatori"
      },
      {
        path:"locatie",
        component:LocatieComponent
      },
      {
        path: "tip-utilizatori",
        component: TipUtilizatoriComponent
      },
      {
        path: "utilizatori",
        component: UtilizatoriComponent
      },
      {
        path: "bautura",
        component: BauturaComponent
      },
      {
        path: "elemente-design",
        component: ElementeDesignComponent
      },
      {
        path: "tip-locatie",
        component: TipLocatieComponent
      },
      {
        path: "sub-locatie",
        component: SubLocatieComponent
      },
      {
        path: "tip-media",
        component: TipMediaComponent
      },
      {
        path: "media",
        component: MediaComponent
      },
      {
        path: "tip-moment-artistic",
        component: TipMomentArtisticComponent
      },
      {
        path: "momente-artistice",
        component: MomenteArtisticeComponent
      },
      {
        path: "tip-servire-meniu",
        component: TipServireMeniuComponent
      },
      {
        path: "tip-meniu",
        component: TipMeniuComponent
      },
      {
        path: "componenta-meniu",
        component: ComponentaMeniuComponent
      },
      {
        path: "tip-eveniment",
        component: TipEvenimentComponent
      },
      {
        path: "sub-tip-eveniment",
        component: SubTipEvenimentComponent
      },
      {
        path: "tip-acces",
        component: TipAccesComponent
      },
      {
        path: "configurari-tip-acces",
        component: ConfigurariTipAccesComponent
      },
      {
        path: "tip-acces-sub-eveniment",
        component: TipAccesSubEvenimentComponent
      },
      {
        path: "tip-locatie-sub-eveniment",
        component: TipLocatieSubEvenimentComponent
      },
      {
        path: "organizatori",
        component: OrganizatoriComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
