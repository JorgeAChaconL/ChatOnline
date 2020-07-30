import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { promise } from 'protractor';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFAuth: AngularFireAuth,
              private router: Router) { }

  login(email:string, password:string){
    return new Promise((resolve,rejected)=>{
    this.angularFAuth.signInWithEmailAndPassword(email,password).then( user =>{
      resolve(user);
    }).catch(err => rejected(err));
    
    });
  }

  logout(){
    this.angularFAuth.signOut().then(() =>
      this.router.navigate(['/login']))
  }

  register(email: string, password: string){
    return new Promise ((resolve,reject)=>{
      this.angularFAuth.createUserWithEmailAndPassword(email,password).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    });
   
  }
}
