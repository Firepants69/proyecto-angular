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

@Injectable({
  providedIn: 'root'
})



export class BoardsService {
  
  readonly API_URL = `${baseUrl}/Boards/list`
  
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
}
