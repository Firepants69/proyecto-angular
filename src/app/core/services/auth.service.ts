import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'https://localhost:7257/api/Users/Register';
  private LOGIN_URL = 'https://localhost:7257/api/Users/Login';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient,private router:Router) {
  }

  
  
  login(userName:string,password:string): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL,{userName,password}).pipe(
      tap(response=>{
        console.log(response)
        if(response.accessToken){
          this.setToken(response.accessToken);
          localStorage.setItem("userId",response.userId)
          localStorage.setItem("userName",response.userName)
        }
      })
    );
  }

  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey,token);
  }

  private getToken(): string | null{
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else{
      return null
    }
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(["/login"]);
  }
}
