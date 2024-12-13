import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';//
import { BoardsService } from '../../core/services/boards.service';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MarkdownModule } from 'ngx-markdown';			



@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [
      CommonModule
      , RouterModule,
      MatCardModule,
      MatDividerModule,
      MarkdownModule,
    
  ],
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})


export class BoardListComponent implements OnInit{
  readonly userName = localStorage.getItem('userName') || '';
  constructor(public boardsService: BoardsService,private router: Router){

  }
  ngOnInit(): void {
    this.getBoards();
  }

  goToEditPost(postId: number,thenPost:string) {
    this.router .navigate(['/edit-post'], {
      state: { postId: postId, thenPost: thenPost }
    });
  }  

  deletePost(postId:number){
    const comfirm = window.confirm("¿quieres eliminar el tablero?")
    if(!comfirm){
      return
    }
    this.boardsService.deleteBoard(postId).subscribe({
      next:(data)=>{
        const index = this.boardsService.boards.findIndex(
          (t) => t.boardId === postId
        );
        
        if (index !== -1) {
          // Eliminar el elemento en el índice encontrado
          this.boardsService.boards.splice(index, 1);
          console.log('Elemento eliminado:', postId);
        } else {
          console.log('Elemento no encontrado');
        }
          console.log(data)
      },error:(err)=>{
        console.error(err)
      }
    })
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
          accountImage: board.user.image == null ? "https://localhost:7257/user-ico/default.jpg":board.user.image,
          date: new Date(board.date).toLocaleDateString()
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
