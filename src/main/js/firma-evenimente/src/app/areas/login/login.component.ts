import { ToastrService } from './../../services/toastr.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private  formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private toastr: ToastrService,
              private cookieService: CookieService) { }

  ngOnInit() {

    if(this.loginService.getUser()!=null){
      //TODO: redirect to page
      this.redirectToPage(this.loginService.getUser());

    }


    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.loginService.loginUser(this.loginForm.controls["username"].value,
    this.loginForm.controls["password"].value).subscribe(
      (response: User) => {

        if(response == null){
         this.toastr.Toast.fire({
           icon: "error",
           title: "Utilizator sau parola incorecte"
         })
        }
        else
        {
          this.toastr.Toast.fire({
            icon: "success",
            title:"Autentificare cu succes!"
          });
          this.redirectToPage(response);

        }

      }
    )

    // this.submitted = true;

    // if (this.loginForm.invalid) {
    //   console.log('invalid');
    //   return;
    // }
    // this.loading = true;
    // auth service
  }

  redirectToPage(user: User){
    switch(user.id_nivel_acces){
      case 1: {
        this.router.navigate(["admin"]);
        break;
      }
      case 2:{
        this.router.navigate(["organizatori"]);
        break;
      }
      case 3: {
        this.router.navigate(["home"]);
        break;
      }
    }
  }

}

