import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  // Arreglo de frases
  public phrases: string[] = ["Hola mi amor", "Hola mi vida", "Holis cariñito","Que quieres puta?","Callate elocico mivida"];
  public selectedPhrase: string = "";
  user: string = '';
  password: string = '';

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

  ngOnInit(): void {
    this.selectRandomPhrase(); 
  }

  selectRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    this.selectedPhrase = this.phrases[randomIndex];
  }
  
}
