import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './SERVICES/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'training';
  constructor (private authService: AuthService, private rotuer: Router){

  }

}
