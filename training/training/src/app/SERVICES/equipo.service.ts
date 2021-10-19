import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  url='http://localhost:5050/ejercicio';

  constructor(private http: HttpClient) { }


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
  id_ejercicio:String;
  user: String;
  name: String;
  description: String;
  series: Number;
  repeticiones: Number;
}

