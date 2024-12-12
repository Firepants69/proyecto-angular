import { Injectable } from '@angular/core';
import { baseUrl } from '../../../baseUrl';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  updateAccount(param1: string, param2: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const urlWithParams = `${this.API_URL}?userName=${param1}&email=${param2}`;
    return this.http.put<any>(urlWithParams, { headers });
  }
}
