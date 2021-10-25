import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { timingSafeEqual } from 'crypto';
import { Ejercicio, NodeService } from 'src/app/SERVICES/node.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  ejercicioForm: FormGroup = new FormGroup({
    user: new FormControl('Nombre del usuario'),
    name: new FormControl('Nombre del ejercicio',[Validators.required, Validators.minLength(5)]),
    description: new FormControl('',[Validators.required, Validators.minLength(5)]),
    series: new FormControl('',[Validators.required, Validators.minLength(5)]),
    repeticiones: new FormControl('',[Validators.required, Validators.minLength(5)]),
  });


  ejercicio:Ejercicio={
    _id: '',
    name: '',
    user: '',
    image: '',
    description: '',
    series: '',
    repeticiones: ''
  }

  constructor(private nodeService: NodeService,
      private rotuer: Router,
      private activeRouter:ActivatedRoute
    ) { }



  ngOnInit(): void {
    const id_entrada = <string> this.activeRouter.snapshot.params.id
    console.log('id de entrada: '+id_entrada)

    if(id_entrada){
      this.nodeService.getUnEjercicio(id_entrada).subscribe(
        res=>{
        // this.ejercicio = res;
          console.log(res)
        },
        err=>console.log(err)
      )
    }
  }

  modificar(){
    this.nodeService.editEjercicio(this.ejercicio._id, this.ejercicio).subscribe(
      res=>{
        console.log(res)
      },
      err=> console.log(err)
    )

    this.rotuer.navigate(['/inicio'])
  }

}
