import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  comments: { Usuario: string, Texto: string }[] = [];

  commentData: { [key: string]: { Usuario: string, Texto: string }[] } = {
    'YuyoHD': [
      { Usuario: 'zhrine', Texto: 'Que se apure, esto no pasaría con mi papá Ciro' },
      { Usuario: 'Maizenauwu', Texto: 'Si no las sube hoy, me rapo we' },
      { Usuario: 'KriegsBote3', Texto: 'No voy a dibujar nada hasta que las suba' },
      { Usuario: 'Hectooooor', Texto: 'Qué diría Tere en esta situación?' },
      { Usuario: 'Tere', Texto: 'Hectooooor' }
    ],
    'TDShaggy': [
      { Usuario: 'RickLanda', Texto: '¿Alguien va al concierto el sábado?' },
      { Usuario: 'smthUTAU', Texto: 'Mejor vamos a visitar las intalaciones del CMAS' },
      { Usuario: 'zhrine', Texto: 'voy a hacer como el Whiplash' },
      { Usuario: 'RobertZuñiga', Texto: 'va a ir mi hermano' },
      { Usuario: 'Tako.boi', Texto: 'Va a ir mi primo' }

    ],
    'TheBindingOfIsaac': [
      { Usuario: 'AMLO', Texto: 'Yo ya pagué, ¿y ustedes?' },
      { Usuario: 'ClaudiaSheinbaum', Texto: 'Me están estafando con los costos, qué horror.' },
      { Usuario: 'Alexis', Texto: 'Ya pagué, pero me siento estafado, deberían haber avisado antes.' },
      { Usuario: 'Jordido', Texto: 'No tengo dinero we' },
      { Usuario: 'Henry', Texto: 'No voy a ir we' }

    ]
  };

  constructor(private route: ActivatedRoute) {}

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
