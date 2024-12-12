import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit{
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
    })
  }
}
