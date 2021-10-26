import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/SERVICES/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  user = {
    name: '',
    password: ''
  }

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    console.log(this.user)

    this.authService.signUp(this.user).subscribe(
      res=> {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/inicio'])
      },
      err => console.log(err)
    )

  }

}
