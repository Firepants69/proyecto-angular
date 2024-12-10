import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';//

interface Post {
  Usuario: string;
  Texto: string;
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
    { Usuario: 'YuyoHD', Texto: 'Oigan pibes cuando sube Vergara las calificaciones', Comentarios: '17 comentarios' },
    { Usuario: 'TDShaggy', Texto: 'Quien para ir al concierto de zhrine', Comentarios: '28 comentarios'  },
    { Usuario: 'TheBindingOfIsaac', Texto: 'ya páguenme lo de la posada culeros', Comentarios: '4 comentarios'  }
  ];
}
