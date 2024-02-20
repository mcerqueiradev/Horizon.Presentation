import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from './model/login';
import { UserModel } from './model/user';
import { map } from 'rxjs/operators';

export interface ApiResponse {
  users: UserModel[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/User';

  constructor(private httpClient: HttpClient, private router: Router) { }

  retrieveAll(): Observable<UserModel[]> {
    return this.httpClient.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.users)
    );
  }
  
  login(loginObj: any): Observable<LoginModel> {
    return this.httpClient.post<LoginModel>('/api/Auth/Login', loginObj);
  }

  getUserDetails(id: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.apiUrl}/${id}`);
  }
}