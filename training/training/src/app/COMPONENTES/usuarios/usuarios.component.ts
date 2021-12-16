import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/SERVICES/auth.service';
import { NodeService } from 'src/app/SERVICES/node.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {



  ListarUsuario: User[] = [];



  constructor(private nodeService:NodeService, private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.listarUsuario();
  }



  listarUsuario(){
    this.nodeService.getUsuarios().subscribe(
      res=>{
        console.log(res)
        this.ListarUsuario=<any>res
      },
      err => console.log(err)
    )
  }


  eliminarUsuario(id:string){
    this.nodeService.deleteUsuario(id).subscribe(
      res=>{
        console.log('usuario eliminado');
        this.listarUsuario()
      },
      err=> console.log(err)
    )
  }

}
