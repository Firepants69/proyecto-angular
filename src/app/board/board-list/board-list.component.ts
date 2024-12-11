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
  // posts: Post[] = [
  //   { Usuario: 'YuyoHD', Texto: 'Oigan pibes cuando sube Vergara las calificaciones', Likes: 30, Comentarios: '5 comentarios' },
  //   { Usuario: 'TDShaggy', Texto: 'Quien para ir al concierto de zhrine', Likes: 40, Comentarios: '5 comentarios'  },
  //   { Usuario: 'TheBindingOfIsaac', Texto: 'ya páguenme lo de la posada culeros', Likes: 5, Comentarios: '5 comentarios'  }
  // ];

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(){
    this.boardsService.getBoards().subscribe({
      next:(data)=>{
        this.boardsService.boards = data.map(board=>({
          Usuario: board.user.name,
          Texto: board.content,
          Likes: board.numOfLikes,
          Comentarios: board.numOfResponses,
          islked : board.isLiked,
          boardId: board.id
        }))
      }
      ,error:(error)=>{
        console.error(error)
      }
    })
  }
}
