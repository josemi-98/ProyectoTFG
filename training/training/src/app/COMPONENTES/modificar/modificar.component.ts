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
    series: new FormControl(''),
    repeticiones: new FormControl(''),
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

  id_entrada:string = "";

  constructor(private nodeService: NodeService,
      private router: Router,
      private activeRouter:ActivatedRoute
    ) { }



  ngOnInit(): void {
    this.id_entrada = <string> this.activeRouter.snapshot.params.id
    console.log('id de entrada: '+this.id_entrada)

    if(this.id_entrada != ""){
      this.nodeService.getUnEjercicio(this.id_entrada).subscribe(
        res=>{
          this.ejercicioForm.get('user')?.setValue(res.user);
          this.ejercicioForm.get('name')?.setValue(res.name);
          this.ejercicioForm.get('description')?.setValue(res.description)
          this.ejercicioForm.get('image')?.setValue(res.image)
          this.ejercicioForm.get('series')?.setValue(res.series)
          this.ejercicioForm.get('repeticiones')?.setValue(res.repeticiones)
        // this.ejercicio = res;
          console.log(res)
        },
        err=>console.log(err)
      )
    }
  }

  editar(){
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

      this.nodeService.editEjercicio(this.id_entrada, ejercicio).subscribe(
        ()=>this.router.navigateByUrl('/inicio'),
        (error)=> console.log(error)
      );
    }

  }

}
