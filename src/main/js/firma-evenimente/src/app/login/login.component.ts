import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;
  loading=false;
  submitted=false;
  returnUrl:string;

  constructor(private  formBuilder:FormBuilder,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit()
  {


    this.loginForm=this.formBuilder.group({
      NUME:['',Validators.required],
      PRENUME:['',Validators.required],
      NUMAR_TELEFON:['',Validators.required],
      ADRESA_MAIL:['',Validators.required],
      USERNAME:['',Validators.required],
      PAROLA:['',Validators.required]



    });

  }

  get form(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted=true;

    if(this.loginForm.invalid){
      console.log("invalid");
      return;
    }
    this.loading=true;
    //auth service
  }

}

