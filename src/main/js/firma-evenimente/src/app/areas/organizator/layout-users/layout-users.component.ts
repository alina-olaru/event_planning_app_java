import { Component, OnInit } from '@angular/core';
import { faCalendarCheck, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Models/User';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-users',
  templateUrl: './layout-users.component.html',
  styleUrls: ['./layout-users.component.scss']
})
export class LayoutUsersComponent implements OnInit {

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

  GoToUseri(){
    this.router.navigate(["organizatori", "utilizatori"]);
  }

}
