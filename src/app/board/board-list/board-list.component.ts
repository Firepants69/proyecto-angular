import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';//

interface Post {
  Usuario: string;
  Texto: string;
  Likes: number;
  Comentarios: string;
}
@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})


export class BoardListComponent {
  posts: Post[] = [
    { Usuario: 'YuyoHD', Texto: 'Oigan pibes cuando sube Vergara las calificaciones', Likes: 30, Comentarios: '5 comentarios' },
    { Usuario: 'TDShaggy', Texto: 'Quien para ir al concierto de zhrine', Likes: 40, Comentarios: '5 comentarios'  },
    { Usuario: 'TheBindingOfIsaac', Texto: 'ya páguenme lo de la posada culeros', Likes: 5, Comentarios: '5 comentarios'  }
  ];
}
