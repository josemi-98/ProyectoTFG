import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ejercicio, NodeService } from 'src/app/SERVICES/node.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  photoSelected!: string | ArrayBuffer;
  file!: File;

  ejercicioForm: FormGroup = new FormGroup({
    user: new FormControl('Nombre del usuario'),
    name: new FormControl('Nombre del ejercicio',[Validators.required, Validators.minLength(5)]),
    description: new FormControl('',[Validators.required, Validators.minLength(5)]),
    image: new FormControl(''),
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

  constructor(private nodeService: NodeService,
      private router: Router
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

      this.nodeService.addEjercicio(ejercicio).subscribe(
        ()=>this.router.navigateByUrl('/inicio'),
        (error)=> console.log(error)
      );
    }

  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      //reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    this.nodeService
      .createPhoto(title.value, description.value, this.file)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/photos'])
        },
        err => console.log(err)
      );
    return false;
  }


}
