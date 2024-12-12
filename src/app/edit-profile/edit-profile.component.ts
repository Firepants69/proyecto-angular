import { Component, OnInit } from '@angular/core';
import { AccountService } from './../core/services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  user: string = '';
  email: string = '';
  constructor(public accountService: AccountService, private router: Router,private authService: AuthService){

  }

  ngOnInit(): void {
    this.getProfile();
    this.user = this.accountService.account.userName;
    this.email = this.accountService.account.email;
  }

  getProfile(){
    this.accountService.getAccount().subscribe({
    
      next: (data)=>{
        console.log(data)
        this.accountService.account = {...data,date:new Date(data.date).toLocaleDateString()};
      },error: (err)=>{
        console.error(err);
      }
    });
  }

  updateProfile() {
    
    this.accountService.updateAccount(this.user,this.email).subscribe({
      next: (response) => {
        console.log('Account updated successfully:', response);
        localStorage.setItem('userName',this.user)
        window.alert("datos cambiados con exito!")
        this.authService.logout()
        
      },
      error: (err) => {
        console.error('Error updating account:', err);
      }
    });
  }
}
