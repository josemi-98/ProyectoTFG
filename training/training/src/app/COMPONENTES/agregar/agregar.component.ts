import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ejercicio, NodeService } from 'src/app/SERVICES/node.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

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
      private rotuer: Router
    ) { }

  save(){
    if(this.ejercicioForm.valid){
      let ejercicio: Ejercicio = {
        name: this.ejercicioForm.get('name')?.value,
        _id: this.ejercicioForm.get('id')?.value,
        user: this.ejercicioForm.get('user')?.value,
        image: this.ejercicioForm.get('image')?.value,
        description: this.ejercicioForm.get('description')?.value,
        series: this.ejercicioForm.get('series')?.value,
        repeticiones: this.ejercicioForm.get('repeticiones')?.value
      };
      this.nodeService.addEjercicio(this.ejercicio).subscribe()
      this.rotuer.navigate(['/inicio'])


     /* then( _ => {
        this.rotuer.navigateByUrl('/')
      })*/
    }

  }

  agregar(){
   /* //delete this.ejercicio._id;
    this.nodeService.addEjercicio(this.ejercicio).subscribe()

    this.rotuer.navigate(['/inicio'])*/
  }

}
