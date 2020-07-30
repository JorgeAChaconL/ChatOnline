import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit() {
  }

  onSumitLogin(){
    this.authService.login(this.email,this.password).then( res =>{
      this.router.navigate(['/home']);
    }).catch(err => alert('Incorrect data or the user doesnt exist'))
  }

}
