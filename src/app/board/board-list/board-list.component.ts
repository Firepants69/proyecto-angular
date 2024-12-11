import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';//
import { BoardsService } from '../../core/services/boards.service';


@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})


export class BoardListComponent implements OnInit{
  constructor(public boardsService: BoardsService){

  }
  ngOnInit(): void {
    this.getBoards();
  }

  

  getBoards(){
    this.boardsService.getBoards().subscribe({
      next:(data)=>{
        console.log(data)
        this.boardsService.boards = data.map(board=>({
          Usuario: board.user.name,
          Texto: board.content,
          Likes: board.numOfLikes,
          Comentarios: board.numOfResponses,
          isLiked : board.isLiked,
          boardId: board.id,
          accountImage: board.user.image == null ? "https://localhost:7257/user-ico/default.jpg":board.user.image  
        }))
      }
      ,error:(error)=>{
        console.error(error)
      }
    })
  }

  toggleLike(board: any) {
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
  
}
