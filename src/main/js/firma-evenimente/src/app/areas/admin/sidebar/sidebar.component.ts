import { LoginService } from "./../../login/login.service";
import { TitleServiceModel } from "./../../../Models/admin/title-service-model";
import { TitleService } from "./../services/title.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  faMapMarkedAlt,
  faGlobeEurope,
  faUmbrellaBeach,
  faGlassCheers,
  faUsers,
  faUserCog,
  faFile,
  faMapPin,
  faIcons,
  faCamera,
  faMagic,
  faPaintBrush,
  faUtensils,
  faClipboardList,
  faDrumstickBite,
  faChessRook,
  faGlassMartini,
  faTicketAlt,
  faDungeon,
  faListAlt,
  faLandmark,
  faUserCircle,
  faUsersCog,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/Models/User";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
  faMapMarkedAlt = faMapMarkedAlt;
  faGlobeEurope = faGlobeEurope;
  faUmbrellaBeach = faUmbrellaBeach;
  faGlassCheers = faGlassCheers;
  faUsers = faUsers;
  faUserCog = faUserCog;
  faFile = faFile;
  faMapPin = faMapPin;
  faIcons = faIcons;
  faCamera = faCamera;
  faMagic = faMagic;
  faPaintBrush = faPaintBrush;
  faUtensils = faUtensils;
  faClipboardList = faClipboardList;
  faDrumstickBite = faDrumstickBite;
  faChessRook = faChessRook;
  faGlassMartini = faGlassMartini;
  faTicketAlt = faTicketAlt;
  faDungeon = faDungeon;
  faListAlt = faListAlt;
  faLandmark = faLandmark;
  faUserCircle = faUserCircle;
  faUsersCog = faUsersCog;

  title: TitleServiceModel;
  openSidebar = true;
  icon: IconDefinition;
  iconString: string;
  loaded: boolean = false;

  user: User = null;

  constructor(
    private titleService: TitleService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.titleService.titleSubject.subscribe(e => {
      setTimeout(() => {
        this.title = e;
        this.SetIcon();
      }, 5);
    });

    this.user = this.loginService.getUser();
  }

  SetIcon() {
    switch (this.title.icon) {
      case "faMapMarkedAlt":
        this.icon = faMapMarkedAlt;
        break;
      case "faGlobeEurope":
        this.icon = faGlobeEurope;
        break;
      case "faUmbrellaBeach":
        this.icon = faUmbrellaBeach;
        break;
      case "faGlassCheers":
        this.icon = faGlassCheers;
        break;
      case "faUsers":
        this.icon = faUsers;
        break;
      case "faUserCog":
        this.icon = faUserCog;
        break;
      case "faMapPin":
        this.icon = faMapPin;
        break;
      case "faIcons":
        this.icon = faIcons;
        break;
      case "faCamera":
        this.icon = faCamera;
        break;
      case "faMagic":
        this.icon = faMagic;
        break;
      case "faPaintBrush":
        this.icon = faPaintBrush;
        break;
      case "faUtensils":
        this.icon = faUtensils;
        break;
      case "faClipboardList":
        this.icon = faClipboardList;
        break;
      case "faDrumstickBite":
        this.icon = faDrumstickBite;
        break;
      case "faChessRook":
        this.icon = faChessRook;
        break;
      case "faGlassMartini":
        this.icon = faGlassMartini;
        break;
      case "faTicketAlt":
        this.icon = faTicketAlt;
        break;
      case "faDungeon":
        this.icon = faDungeon;
        break;
      case "faListAlt":
        this.icon = faListAlt;
        break;
      case "faLandmark":
        this.icon = faLandmark;
        break;
      case "faUsersCog":
        this.icon = faUsersCog;
        break;
      default:
        this.icon = faFile;
    }

    this.loaded = true;
  }

  LogOut() {
    this.loginService.logOutUser();
  }

  ngOnDestroy(): void {
    this.titleService.titleSubject.unsubscribe();
  }
}
