import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  /* 
  getPacientes(): Observable<Paciente[]> {
    const url = 'http://localhost:4200/api/pacientes'; 
    return this.http.get<Paciente[]>(url);
  }
  */

}
