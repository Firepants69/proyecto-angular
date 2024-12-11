import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoardsService } from '../core/services/boards.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-make-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './make-post.component.html',
  styleUrl: './make-post.component.css'
})
export class MakePostComponent {
  constructor(public boardsService: BoardsService, private router: Router) {}
  newBoardContent: string = '';
  postBoard(): void {
    const newBoard = {
      content: this.newBoardContent
    }
    this.boardsService.postBoard(newBoard).subscribe({
      next: (response) => {
        console.log('Tablero creado con éxito:', response);
        this.newBoardContent = '';
        this.router.navigate(["/board-list"])
      }
      ,error:(error)=>{
        console.error(error)
      }
    })
  }
}
