import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';

interface Post {
  Usuario: string;
  Texto: string;
  Likes: number;
  Comentarios: number;
  islked : string;
  boardId: number;
}

interface toPost {
  content: string;
  userID: number;
}

@Injectable({
  providedIn: 'root'
})



export class BoardsService {
  
  readonly API_URL = `${baseUrl}/Boards/list`
  readonly POST_URL = `${baseUrl}/Boards`
  
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

   postBoard(newBoard: Partial<toPost>) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Partial<toPost>>(this.POST_URL, newBoard, { headers });
   }
}
