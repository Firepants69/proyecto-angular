import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  readonly API_URL = `${baseUrl}/Thread/threads-board`;
  
  responses: any[];
  parents: any[];
  threads: any[];
  constructor(private http: HttpClient) {
    this.responses = [];
    this.parents = [];
    this.threads = [];
   }

   getThreadForBoard(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
   return this.http.get<any[]>(this.API_URL,{headers});
  }
}

