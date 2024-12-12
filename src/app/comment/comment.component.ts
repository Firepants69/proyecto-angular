import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreadService } from '../core/services/thread.service';
import { BoardsService } from '../core/services/boards.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogCComponent } from '../components/dialog-c/dialog-c.component';
import { baseUrl, UrlHost } from '../../baseUrl';
import { DialogDComponent } from '../components/dialog-d/dialog-d.component';
 //

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule,RouterModule], //
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  postId: string | null = null;
  userInput: string = '';
  readonly userName = localStorage.getItem('userName') || '';

  constructor(private route: ActivatedRoute,public threadService: ThreadService,public boardService: BoardsService) {}
  
  openDialog(threadId: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:'400px',
      data: {threadId},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Texto del input:', result);
        console.log('id de esa cosa',threadId)
        this.editThread(threadId,result)
      }
    });
    
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogCComponent, {
      width:'400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postThread(result,this.postId);
      }
    });
    
  }

  openDialogDelete(id:any): void {
    const dialogRef = this.dialog.open(DialogDComponent, {
      width:'400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteThread(id)
      }
    });
    
  }
  deleteThread(id:any){
    this.threadService.deleteThread(id).subscribe({
      next:()=>{
        const index = this.threadService.threads.findIndex(
          (t) => t.id === id
        );
        if (index !== -1) {
          this.threadService.threads[index].isDelete = true;
        }
      },error:(err)=>{
        console.error(err)
      }
    })
  }

  postThread(content:string,boardId:any){
    this.threadService.postThread(content,boardId).subscribe({
      next:(data)=>{
        this.threadService.threads.push({
          Usuario: this.userName, 
          Texto: data.content,
          Likes: 0,
          id: data.id,
          boardId: data.boardId,
          numberOfResponses: 0,
          isLiked: false,
          isDelete: false,
          showResponses : false,
          date: new Date(data.date).toLocaleDateString(),
          accountImage: `${UrlHost}user-ico/${this.userName}.jpg`,
          responses: []
        })
      },error:(err)=>{
        console.error(err)
      }
    })
  }

  editThread(threadId:any,result:string){

      this.threadService.editThread(threadId,result).subscribe({
        next:()=>{
          const index = this.threadService.threads.findIndex(
            (t) => t.id === threadId
          );
          if (index !== -1) {
            this.threadService.threads[index].Texto =result;
          }
        },error:(err)=> {
          console.error(err)
        }
      })

  }

  

  

  ngOnInit(): void {
    console.log(this.userName,this.userName)
    this.postId = this.route.snapshot.paramMap.get('id');
    
    // Cargar la publicación
    if (this.postId) {
      this.getBoardById()
      this.threadService.getThreadForBoard(this.postId).subscribe(
        {
          next:(data)=>{
          console.log(data);
            this.threadService.threads = data.map(thread=>({
              Usuario: thread.user.name, 
              Texto: thread.content,
              Likes: thread.numberOfLikes,
              id: thread.id,
              boardId: thread.boardId,
              numberOfResponses: thread.numOfResponses,
              isLiked: thread.isLiked,
              isDelete: thread.isDelete,
              showResponses : false,
              date: new Date(thread.date).toLocaleDateString(),
              accountImage: thread.user.image,
              responses: []

            })) 
          },error:(err)=>{
            console.error(err)
          }
        }
      )      
      
    }
  }

  toggleLike(thread: any) {
    if (thread.isLiked) {
      // Si ya le ha dado like, eliminarlo
      this.threadService.removeLike(thread.id).subscribe(() => {
        thread.Likes--;
        thread.isLiked = false;
      });
    } else {
      // Si no le ha dado like, agregarlo
      this.threadService.addLike(thread.id).subscribe(() => {
        thread.Likes++;
        thread.isLiked = true;
      });
    }
  }

  getBoardById(){
    if(this.postId){
      this.boardService.getBoardById(this.postId).subscribe({
        next:(data)=>{
          console.log(data);
          this.boardService.board = {
            image :  data.user.accountImage == null  ?"https://localhost:7257/user-ico/default.jpg":data.user.accountImage ,
            userName: data.user.userName,
            content : data.content,
            date: new Date(data.date).toLocaleDateString()
          };
        },error:(err)=> {
          console.error(err)
        }
      })

    }
  }

  

}
