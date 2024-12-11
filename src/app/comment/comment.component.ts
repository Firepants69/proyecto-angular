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
  

  constructor(private route: ActivatedRoute,public threadService: ThreadService) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    
    // Cargar la publicación
    if (this.postId) {
      this.threadService.getThreadForBoard(this.postId).subscribe(
        {
          next:(data)=>{
          console.log(data);
            this.threadService.threads = data.map(thread=>({
              Usuario: thread.user.name, 
              Texto: thread.content,
              Likes: thread.numOfLikes

            })) 
          },error:(err)=>{
            console.error(err)
          }
        }
      )      
      
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
