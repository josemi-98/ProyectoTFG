import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Ejercicio, NodeService } from '../../SERVICES/node.service';

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


  constructor(private NodeService:NodeService, private router:Router) { }

  ngOnInit(): void {
    this.listarEjercicio();
  }

  listarEjercicio(){
    this.NodeService.getEjercicios().subscribe(
      res=>{
        console.log(res)
        this.ListarEjercicio=<any>res
      },
      err => console.log(err)
    )
  }

  eliminar(id:string){
    this.NodeService.deleteEjercicio(id).subscribe(
      res=>{
        console.log('ejercicio eliminado');
        this.listarEjercicio()
      },
      err=> console.log(err)
    )
  }

  modificar(id:string){
    this.router.navigate(['/edit/'+id])
  }

}
