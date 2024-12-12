import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly API_URL = `${baseUrl}/Users`
  readonly YOUR_BOARDS = `${baseUrl}/Boards/your-boards`
  account: any;
  your_board: any[]
  constructor(private http: HttpClient) { 
    this.account = {}
    this.your_board = []
  }
  getAccount(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(this.API_URL,{headers});
  }
  getYourBoards(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(this.YOUR_BOARDS,{headers})
  }
}
