import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName: string = '';
  passWord: string = '';
  rpassWord: string = '';
  email: string = '';
  errorMessage: string ='';

  constructor(public accountServices: AccountService,private router: Router){

  }

  register(){
    if(this.rpassWord != this.passWord){
      this.errorMessage = "las contraseña no coincide";
      return
    }
    this.accountServices.register(this.userName,this.email,this.passWord).subscribe({
      next:()=>{
        this.router.navigate(['login'])
      },error:(err)=>{
        if(err.status === 200){
          this.router.navigate(['login'])
        }
        this.errorMessage = "Registro fallido"
        
      }
    })
  }

} 
