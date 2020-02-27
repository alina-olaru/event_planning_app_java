import { RegisterService } from './register.service';
import { ToastrService } from './../../services/toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/modules/validators/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private  formBuilder: FormBuilder,
    private toastr: ToastrService,
    private registerService: RegisterService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nume: ['', Validators.required],
      prenume: ['', Validators.required],
      numar_telefon: ['', Validators.required],
      adresa_mail: ['', [Validators.email, Validators.required]],
      username: ['', Validators.required],
      parola: ['', Validators.required],
      confirma_parola: ['', Validators.required]
    }, {
      validator: MustMatch('parola', 'confirma_parola')
  });
  }

  get form() {
    return this.registerForm.controls;
  }

  submitRegister(){

    if(this.registerForm.valid){

      this.registerService.RegisterUser(
        this.registerForm.controls["nume"].value,
        this.registerForm.controls["prenume"].value,
        this.registerForm.controls["numar_telefon"].value,
        this.registerForm.controls["adresa_mail"].value,
        this.registerForm.controls["username"].value,
        this.registerForm.controls["parola"].value).subscribe(
          result => {

            if(result==null){
              this.toastr.Toast.fire({
                icon: "error",
                title: "Nu s-a putut crea contul, te rog verifica datele introduse!"
              });
            }else
            {

            }

          }
        )

    }

  }

}
