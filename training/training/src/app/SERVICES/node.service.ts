import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  //CRUD

  url='http://localhost:5050/ejercicio';
  url2='http://localhost:5050/user';
  token: any;

  collection = 'ejercicios';

  constructor(private http: HttpClient, private router: Router) { }

  //get ejercicios
  getEjercicios() {
    this.token=localStorage.getItem('token');
    return this.http.get(this.url+'/user/user', {headers: {Authorization:this.token}})
  }

  getAll(filter: any){
    //return this.http.get(`${this.url}/user/user${filter}`)
    return this.http.get(`${this.url}/${filter}`)
  }

  //get un Ejercicio
  getUnEjercicio(id:String){
    this.token=localStorage.getItem('token');
    return this.http.get<Ejercicio>(this.url+'/'+id,  {headers: {Authorization:this.token}});
  }

  //agregar Ejercicio
  addEjercicio(ejercicio:Ejercicio){
    this.token=localStorage.getItem('token');
    console.log(this.token);
    return this.http.post(this.url, ejercicio, {headers: {Authorization:this.token}})
  }

  //eliminar
  deleteEjercicio(id:string){
    this.token=localStorage.getItem('token');
    console.log(this.token);
    return this.http.delete(this.url+'/'+id, {headers: {Authorization:this.token}});
  }

  //modificarEjercicio
  editEjercicio(id:string, ejercicio:Ejercicio){
    this.token=localStorage.getItem('token');
    console.log(this.token);
    return this.http.put(this.url+'/'+id, ejercicio, {headers: {Authorization:this.token}})
  }

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(this.url, fd);
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.url);
  }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.url}/${id}`);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updatePhoto(id: string, title: string, description: string) {
    return this.http.put(`${this.url}/${id}`, {title, description});
  }

   //get ejercicios

   getUsuarios() {
    return this.http.get(this.url2)
  }

  //get un Ejercicio

  getUnUsuario(id:String){
    return this.http.get(this.url2+'/'+id);
  }

  //agregar Ejercicio
  addUsuario(ejercicio:Ejercicio){
    return this.http.post(this.url2, ejercicio)
  }
/*  addEjercicio2(ejercicio:Ejercicio){
    return this.http.collection<Ejercicio>(this.collection).valueChanges();
  }*/

  //eliminar
  deleteUsuario(id:string){
    return this.http.delete(this.url2+'/'+id);
  }

  //modificarEjercicio
  editUsuario(id:string, ejercicio:Ejercicio){
    return this.http.put(this.url2+'/'+id, ejercicio)
  }


}

export interface Ejercicio {
  keys?: string;
  _id: string ;
  user?: string;
  name?: string;
  image?: string;
  description?: string;
  series?: string;
  repeticiones?: string;
}

export interface Usuario {
  keys?: string;
  _id: string ;
  user?: string;
  name?: string;
  password?: string;
}

export interface Photo {
  _id?: string;
  title: String;
  description: String;
  imagePath: string;
}

