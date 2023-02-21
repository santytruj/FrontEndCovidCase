import { Component , OnInit} from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { ApiService } from 'src/app/servicios/api/api.service';
import { LoginI } from 'src/app/modelos/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario : new FormControl(null, [Validators.required]),
    password : new FormControl(null, [Validators.required])
  });

  constructor(private api:ApiService, private router:Router){}

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void{
    //this.checkLocalStorage();
  }

  // checkLocalStorage(){
  //   if (localStorage.getItem('token')) {
  //     this.router.navigate(['dashboard'])
  //   };
  // }

  onLogin() {
    const formValue = this.loginForm.value;
    if (formValue.usuario === null || formValue.usuario === undefined) {
      this.errorStatus = true;
        this.errorMsj = "No pueden ir campos vacios";
      return;
    }
    const loginData: LoginI = {
      email: formValue.usuario,
      password: formValue.password || null
    };
    this.api.loginByEmail(loginData).subscribe(data => {
      let dataResponse:ResponseI = data;
      if (dataResponse.succeeded) {
        localStorage.setItem("token",dataResponse.data.jwToken);
        localStorage.setItem("rol",dataResponse.data.roles);
        this.router.navigate(['dashboard']);

      }else{
        this.errorStatus = true;
        this.errorMsj = data.errors;
      }
    });
  }

  }


