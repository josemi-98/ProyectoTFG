import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { AuthService, User } from 'src/app/SERVICES/auth.service';
import { Ejercicio, NodeService } from '../../SERVICES/node.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  ListarEjercicio: Ejercicio[] = [];



  constructor(private nodeService:NodeService, private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.listarEjercicio();
  }

  listarEjercicio(){
    this.nodeService.getEjercicios().subscribe(
      res=>{
        console.log(res)
        this.ListarEjercicio=<any>res
      },
      err => console.log(err)
    )
  }

  eliminar(id:string){
    this.nodeService.deleteEjercicio(id).subscribe(
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
