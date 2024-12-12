import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  readonly API_URL_BOARD = `${baseUrl}/Thread/threads-board`;
  readonly API_URL_RESPONSES = `${baseUrl}/Thread/get-thread-responses/`;
  readonly POST_LIKE_URL = `${baseUrl}/Like/post-likeThread`;
  readonly DELETE_LIKE_URL = `${baseUrl}/Like/delete-likeThread`;
  readonly UPDATE_URL = `${baseUrl}/Thread`;

  responses: any[];
  parents: any[];
  threads: any[];
  currentThread:{};
  constructor(private http: HttpClient) {
    this.responses = [];
    this.parents = [];
    this.threads = [];
    this.currentThread = {};
   }

   getThreadForBoard(boardId:string){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
   return this.http.get<any[]>(`${this.API_URL_BOARD}/${boardId}`,{headers});
  }

  getResponsesForThread(threadId:Number){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.API_URL_RESPONSES}/${threadId}`,{headers});
  }

  addLike(threadId: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = { threadId:threadId };
    return this.http.post<any>(this.POST_LIKE_URL, body, { headers });
  }

  // Método para eliminar un like
  removeLike(threadId: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = { threadId:threadId };
    return this.http.delete<any>(this.DELETE_LIKE_URL, { headers, body });
  }

  editThread(threadId:any,newText:string){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const body = {  
      content: newText,
      threadId: threadId };
    
    return this.http.put<any>(`${this.UPDATE_URL}`,body, { headers});
  }

  postThread(newText:string,boardId:string){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const body = {  
      boardId: boardId,
      content: newText};
    
    return this.http.post<any>(`${this.UPDATE_URL}`,body, { headers});
  }

  deleteThread(threadId:any){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    
    return this.http.delete<any>(`${this.UPDATE_URL}/${threadId}`, { headers});
  }
}

