import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }


  getUser(email: string) {
    return this.http.get('http://localhost:3000/login');
  }
  
  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/sessions', {
      email: username,
      password: password
    });
  }
  

}
