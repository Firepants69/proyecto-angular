import { Component } from '@angular/core';
import { BoardsService } from '../core/services/boards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent {
  constructor(public boardsService: BoardsService, private route: ActivatedRoute, private router: Router) {}

  updatedBoardContent: string = '';
  boardId: number | null = null;
  userId: string | null = localStorage.getItem('userId');

  editBoard(): void {
    const updatedBoard = {
      content: this.updatedBoardContent
    };

    this.boardsService.editBoard(updatedBoard).subscribe({
      next: (response) => {
        console.log('Tablero actualizado', response);
        this.router.navigate(["/board-list"])
      },
      error: (error) => {
        console.error('Error al actualizar el tablero', error);
      }
    });
  }

}
