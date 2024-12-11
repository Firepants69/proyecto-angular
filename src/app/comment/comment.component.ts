import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreadService } from '../core/services/thread.service';

 //

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule], //
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  postId: string | null = null;
  post: { Usuario: string, Texto: string, Comentarios: string } | undefined;
  comments: { Usuario: string, Texto: string, Likes: number }[] = [];

  commentData: { [key: string]: { Usuario: string, Texto: string, Likes: number }[] } = {
    'YuyoHD': [
      { Usuario: 'zhrine', Texto: 'Que se apure, esto no pasaría con mi papá Ciro', Likes: 5},
      { Usuario: 'Maizenauwu', Texto: 'Si no las sube hoy, me rapo we', Likes: 5 },
      { Usuario: 'KriegsBote3', Texto: 'No voy a dibujar nada hasta que las suba', Likes: 5 },
      { Usuario: 'Hectooooor', Texto: 'Qué diría Tere en esta situación?', Likes: 5 },
      { Usuario: 'Tere', Texto: 'Hectooooor', Likes: 5 }
    ],
    'TDShaggy': [
      { Usuario: 'RickLanda', Texto: '¿Alguien va al concierto el sábado?', Likes: 5 },
      { Usuario: 'smthUTAU', Texto: 'Mejor vamos a visitar las intalaciones del CMAS', Likes: 5 },
      { Usuario: 'zhrine', Texto: 'voy a hacer como el Whiplash', Likes: 5 },
      { Usuario: 'RobertZuñiga', Texto: 'va a ir mi hermano', Likes: 5 },
      { Usuario: 'Tako.boi', Texto: 'Va a ir mi primo', Likes: 5 }

    ],
    'TheBindingOfIsaac': [
      { Usuario: 'AMLO', Texto: 'Yo ya pagué, ¿y ustedes?', Likes: 5 },
      { Usuario: 'ClaudiaSheinbaum', Texto: 'Me están estafando con los costos, qué horror.', Likes: 5 },
      { Usuario: 'Alexis', Texto: 'Ya pagué, pero me siento estafado, deberían haber avisado antes.', Likes: 5 },
      { Usuario: 'Jordido', Texto: 'No tengo dinero we', Likes: 5 },
      { Usuario: 'Henry', Texto: 'No voy a ir we', Likes: 5 }

    ]
  };

  constructor(private route: ActivatedRoute,public threadService: ThreadService) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    
    // Cargar la publicación
    if (this.postId) {
      this.post = {
        Usuario: this.postId,
        Texto: this.getPostText(this.postId),
        Comentarios: `${this.commentData[this.postId]?.length} comentarios`
      };
      
      // Cargar los comentarios relacionados con la publicación
      if (this.commentData[this.postId]) {
        this.comments = this.commentData[this.postId];
      }
    }
  }

  private getPostText(id: string): string {
    switch (id) {
      case 'YuyoHD':
        return 'Oigan pibes cuando sube Vergara las calificaciones';
      case 'TDShaggy':
        return 'Quien para ir al concierto de zhrine';
      case 'TheBindingOfIsaac':
        return 'ya páguenme lo de la posada culeros';
      default:
        return '';
    }
  }

}
