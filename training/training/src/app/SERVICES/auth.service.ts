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

  //get ejercicios

  getUsuarios() {
    return this.http.get(this.url)
  }

  //get un Ejercicio

  getUnUsario(id:String){
    return this.http.get(this.url+'/'+id);
  }
  //eliminar
  deleteUsuario(id:string){
    return this.http.delete(this.url+'/'+id);
  }




}

export interface User {
  keys?: string;
  _id: string ;
  user?: string;
  name?: string;
  last_name?: string;
  nationality?: string;
  password?: string;
}
