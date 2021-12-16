import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './COMPONENTES/agregar/agregar.component';
import { InicioComponent } from './COMPONENTES/inicio/inicio.component';
import { ModificarComponent } from './COMPONENTES/modificar/modificar.component';
import { SigninComponent } from './COMPONENTES/signin/signin.component';
import { RegistrarComponent } from './COMPONENTES/registrar/registrar.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';
import { UsuariosComponent } from './COMPONENTES/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo:'/inicio', pathMatch:'full'},
  { path:'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  { path:'add', component: AgregarComponent},
  { path: 'edit/:id', component: ModificarComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: RegistrarComponent},
  { path: 'usuario', component: UsuariosComponent},
  { path: '**', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
