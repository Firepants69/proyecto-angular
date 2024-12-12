import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';//
import { BoardsService } from '../../core/services/boards.service';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})


export class BoardListComponent implements OnInit{
  constructor(public boardsService: BoardsService, private route: ActivatedRoute, private router: Router){

  }
  boardId: number | null = null;
  userId: string | null = localStorage.getItem('userId');

  ngOnInit(): void {
    this.getBoards(),
    this.boardId = +this.route.snapshot.paramMap.get('id')!;
  }

  

  getBoards(){
    this.boardsService.getBoards().subscribe({
      next:(data)=>{
        console.log(data)
        this.boardsService.boards = data.map(board=>({
          userId: board.user,
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

  onEditBoard(boardId: string): void {
    // Guarda el ID del tablero en el localStorage para usarlo luego
    localStorage.setItem('boardId', boardId);

    // Redirige a la página de edición del tablero
    this.router.navigate(['/update-post']);
  }

  onDeleteBoard(boardId: string): void {
    if (confirm("¿Seguro que quieres eliminar este tablero?")) {
      localStorage.setItem('boardId', boardId);
      this.boardsService.deleteBoard().subscribe({
        next: (response) => {
          console.log('Tablero eliminado', response);
          this.getBoards()
        },
        error: (error) => {
          console.error('Error al eliminar el tablero', error)
        }
      })
      
    } 
  }
}
