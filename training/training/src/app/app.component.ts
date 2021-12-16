import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from './SERVICES/auth.service';
import { NodeService } from './SERVICES/node.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  allEjercicios: any;
  search: String | undefined;
  ListarUsuario: User[] = [];

  constructor(public authService: AuthService, private router:Router, public nodeService: NodeService) {}
  ngOnInit(): void {
    this.loadEjercicios()
  }


  title = 'training';

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])

  }
  //comprobacion del token
  loggedIn(){
    return !!localStorage.getItem('token')
  }


  listarUsuario(){
    this.authService.getUsuarios().subscribe(
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


  loadEjercicios(){
    console.log('palabras ', this.search)
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}` : ''
    this.nodeService.getAll(filter).subscribe(
      (ejercicios)=> {
        this.allEjercicios = ejercicios
      },
      (error) => {
        console.error('Error ->', error)
      }
    )
  }

}
