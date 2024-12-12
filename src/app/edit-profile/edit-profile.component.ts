import { Component, OnInit } from '@angular/core';
import { AccountService } from './../core/services/account.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  constructor(public accountService: AccountService){

  }
  newUsername: string = '';
  newEmail: string = '';
  ngOnInit(): void {
    this.getProfile();
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
    console.log('Método updateProfile ejecutado');
    const updatedUser = this.newUsername
    const updatedEmail = this.newEmail
    this.accountService.updateAccount(updatedUser, updatedEmail).subscribe({
      next: (response) => {
        console.log('Account updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating account:', err);
      }
    });
  }
}
