import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  register(user: { userName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  getYourBoards(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(this.YOUR_BOARDS,{headers})
  }

  updateAccount(userName:string,email:string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    return this.http.put<any>(`${this.API_URL}`,formData, { headers });
  }

}
