import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  url='http://localhost:5050/ejercicio';

  collection = 'ejercicios';

  constructor(private http: HttpClient) { }

 /* getEjercicio() : Observable<Ejercicio[]>{
    return this.http.collection<Ejercicio>(this.collection).valueChanges();
  }*/

  //get ejercicios

  getEjercicios() {
    return this.http.get(this.url)
  }

  //get un Ejercicio

  getUnEjercicio(id:String){
    return this.http.get(this.url+'/'+id);
  }

  //agregar Ejercicio
  addEjercicio(ejercicio:Ejercicio){
    return this.http.post(this.url, ejercicio)
  }
/*  addEjercicio2(ejercicio:Ejercicio){
    return this.http.collection<Ejercicio>(this.collection).valueChanges();
  }*/

  //eliminar
  deleteEjercicio(id:string){
    return this.http.delete(this.url+'/'+id);
  }

  //modificarEjercicio
  editEjercicio(id:string, ejercicio:Ejercicio){
    return this.http.put(this.url+'/'+id, ejercicio)
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

