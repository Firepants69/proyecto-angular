import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';

interface Post {
  Usuario: string;
  Texto: string;
  Likes: number;
  Comentarios: number;
  isLiked : string;
  boardId: number;
  accountImage: string;
}

@Injectable({
  providedIn: 'root'
})



export class BoardsService {
  
  readonly API_URL = `${baseUrl}/Boards/list`
  readonly POST_LIKE_URL = `${baseUrl}/Like/post-likeBoard`;
  readonly DELETE_LIKE_URL = `${baseUrl}/Like/delete-likeBoard`;
  
  boards: Post[];
  constructor(private http: HttpClient) {
    this.boards = [];
   }
   getBoards(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(this.API_URL,{headers});
   }

   addLike(boardId: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = { boardId:boardId };
    return this.http.post<any>(this.POST_LIKE_URL, body, { headers });
  }

  // Método para eliminar un like
  removeLike(boardId: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = { boardId:boardId };
    return this.http.delete<any>(this.DELETE_LIKE_URL, { headers, body });
  }
}
