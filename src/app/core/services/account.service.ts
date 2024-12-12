import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { BoardsService } from '../../core/services/boards.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit{
  constructor(public accountService: AccountService,public boardsService: BoardsService){

  }

  ngOnInit(): void {
    this.getProfile();
    this.getYourBoards();
  }

  getYourBoards(){
    this.accountService.getYourBoards().subscribe({
      next:(data=>{
        this.accountService.your_board = data.map(board=>({
          Usuario: board.user.name,
          Texto: board.content,
          Likes: board.numOfLikes,
          Comentarios: board.numOfResponses,
          isLiked : board.isLiked,
          boardId: board.id,
          accountImage: board.user.image == null ? "https://localhost:7257/user-ico/default.jpg":board.user.image  
        }))
      }),error:(err)=>{
        console.error(err)
      }
    })
  }
  toggleLike(board: any,event:Event) {
    event.stopPropagation();
    if (board.isLiked) {
      // Si ya le ha dado like, eliminarlo
      this.boardsService.removeLike(board.boardId).subscribe(() => {
        board.Likes--;
        board.isLiked = false;
      });
    } else {
      // Si no le ha dado like, agregarlo
      this.boardsService.addLike(board.boardId).subscribe(() => {
        board.Likes++;
        board.isLiked = true;
      });
    }
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
