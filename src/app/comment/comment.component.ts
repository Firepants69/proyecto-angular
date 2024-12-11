import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreadService } from '../core/services/thread.service';

 //

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule,RouterModule], //
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
              Likes: thread.numOfLikes,
              id: thread.id,
              boardId: thread.boardId,

            })) 
          },error:(err)=>{
            console.error(err)
          }
        }
      )      
      
    }
  }

  

}
