import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  user: string = '';
  password: string = '';
  errorMessage: string = '';  // Variable para el mensaje de error

  constructor (private authService: AuthService,private router: Router){

  }
  
  login(): void{
    this.authService.login(this.user,this.password).subscribe({
      next:()=> this.router.navigate(["/Feed"]),
      error:(err)=> {
        console.error(err)
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
      
    })
  }
  
}