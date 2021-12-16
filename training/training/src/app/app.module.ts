import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarComponent } from './COMPONENTES/agregar/agregar.component';
import { InicioComponent } from './COMPONENTES/inicio/inicio.component';
import { ModificarComponent } from './COMPONENTES/modificar/modificar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { SigninComponent } from './COMPONENTES/signin/signin.component';
import { RegistrarComponent } from './COMPONENTES/registrar/registrar.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './SERVICES/token-interceptor.service';
import { NgFallimgModule } from 'ng-fallimg';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UsuariosComponent } from './COMPONENTES/usuarios/usuarios.component';


@NgModule({
  declarations: [
    AppComponent, AgregarComponent, InicioComponent,
    ModificarComponent, ErrorComponent, SigninComponent,
    RegistrarComponent, UsuariosComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule,
    MaterialModule, HttpClientModule, FormsModule,
    ReactiveFormsModule, MDBBootstrapModule.forRoot(), NgFallimgModule.forRoot({
      default: 'assets/img.jpg'
    }),
    FlashMessagesModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
