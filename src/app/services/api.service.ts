import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:4000'; // Asegúrate de reemplazar esto con la URL de tu backend

  constructor(private http: HttpClient) { }


  getUser(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('HEADERS:', headers);
    return this.http.get(`${this.baseUrl}/api/auth/user`, { headers });
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

  logOut(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/api/auth/logout`, { headers });
  }

}
