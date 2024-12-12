import { Component, OnInit } from '@angular/core';
import { AccountService } from './../core/services/account.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  constructor(public accountService: AccountService){

  }

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
    const updatedAccount = this.accountService.account;
    this.accountService.updateAccount(updatedAccount).subscribe({
      next: (response) => {
        console.log('Account updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating account:', err);
      }
    });
  }
}
