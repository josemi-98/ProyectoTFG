import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './COMPONENTES/agregar/agregar.component';
import { InicioComponent } from './COMPONENTES/inicio/inicio.component';
import { ModificarComponent } from './COMPONENTES/modificar/modificar.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo:'/inicio', pathMatch:'full'},
  { path:'inicio', component: InicioComponent},
  { path:'add', component: AgregarComponent},
  { path: 'edit/:id', component: ModificarComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
