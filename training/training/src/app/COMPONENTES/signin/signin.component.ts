import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/SERVICES/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    name: '',
    password: ''
  }
  constructor( private authService: AuthService,
    private router: Router) { }

    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';

 mostrarPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
 }
  ngOnInit(): void {
  }

  signIn() {
    console.log(this.user)

    this.authService.signIn(this.user).subscribe(
      res=> {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/inicio'])
      },
      err => console.log(err)
    )

  }
}
