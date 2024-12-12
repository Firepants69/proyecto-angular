import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly API_URL = `${baseUrl}/Users`
  account: any;

  constructor(private http: HttpClient) { 
    this.account = {}
  }
  getAccount(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(this.API_URL,{headers});
  }

  updateAccount(updatedAccount: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<any>(`${this.API_URL}/${updatedAccount.id}`, updatedAccount, { headers });
  }
}
