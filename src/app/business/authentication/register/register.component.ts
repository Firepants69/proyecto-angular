import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName: string = ''; // Campo para el nombre de usuario
  email: string = ''; // Campo para el correo
  password: string = ''; // Campo para la contraseña
  errorMessage: string = ''; // Para errores
  successMessage: string = ''; // Para mensajes de éxito

  constructor(private account: AccountService, private router: Router) {}

  register(): void {
    const userData = {
      userName: this.userName,
      email: this.email,
      password: this.password,
    };
  
    this.account.register(userData).subscribe({
      next: () => {
        this.successMessage = '¡Registro exitoso!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.error('Error del servidor:', err);
        this.errorMessage = 'Hubo un problema al registrarte. Intenta nuevamente.';
      },
    });
  }
    

}
