import { Component, OnInit } from '@angular/core';
import { Ejercicio, EquipoService } from '../../SERVICES/equipo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  //variable
  //ListarEjercicio = new Array<Ejercicio>()

  //variable
  //ListarEjercicio = new Array<Ejercicio>()
  ListarEjercicio: Ejercicio[] = [];


  constructor(private EquipoService:EquipoService) { }

  ngOnInit(): void {
    this.listarEjercicio();
  }

  listarEjercicio(){
    this.EquipoService.getEjercicios().subscribe(
      res=>{
        console.log(res)
        this.ListarEjercicio=<any>res
      },
      err => console.log(err)
    )
  }

}
