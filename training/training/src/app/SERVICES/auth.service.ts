import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url='http://localhost:5050/user';

  constructor( private http: HttpClient, private router: Router) { }

  signUp(user: any){
    return this.http.post<any>(this.url + '/register', user)
  }
  signIn(user: any){
    return this.http.post<any>(this.url + '/login', user)
  }

  //comprobacion del token
  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])

  }
}
