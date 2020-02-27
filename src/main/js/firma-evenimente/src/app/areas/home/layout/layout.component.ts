import { Router } from '@angular/router';
import { LoginService } from "./../../login/login.service";
import { Component, OnInit } from "@angular/core";
import {
  faCalendarCheck,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/Models/User";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  faCalendarCheck = faCalendarCheck;
  faUserCircle = faUserCircle;
  user: User = null;
  constructor(private loginService: LoginService,
    private router: Router) {}

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

  LogOut() {
    this.loginService.logOutUser();
  }

  AddNewEvent(){
    this.router.navigate(["home", "new-event"]);
  }

  GoToMyEvents(){
    this.router.navigate(["home", "welcome"]);
  }
}
