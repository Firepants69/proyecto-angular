import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Post {
  Usuario: string;
  Texto: string;
  Comentarios: string;
}
@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})


export class BoardListComponent {
  posts: Post[] = [
    { Usuario: 'Usuario1', Texto: 'Oigan pibes cuando sube Vergara las calificaciones', Comentarios: '17 comentarios' },
    { Usuario: 'Usuario2', Texto: 'Quien para ir al concierto de zhrine', Comentarios: '28 comentarios'  },
    { Usuario: 'Usuario3', Texto: 'ya páguenme lo de la posada culeros', Comentarios: '4 comentarios'  }
  ];
}
