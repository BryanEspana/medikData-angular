import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:4000'; // Asegúrate de reemplazar esto con la URL de tu backend

  constructor(private http: HttpClient) { }


  getUser(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/users/${email}`);
  }
  
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, {
      email: email,
      password: password
    });
  }

  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signup`, userData);
  }  

}
