import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:4000'; // Asegúrate de reemplazar esto con la URL de tu backend

  constructor(private http: HttpClient) { }


  //Auth
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

  //Agendar Citas
  getClinicas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/addcitas/clinicas`);
  }

  getEspecialidades(id_clinica: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/addcitas/especialidades/${id_clinica}`);
  }

  getMedicos(id_clinica: number, especialidad: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/addcitas/medico/${especialidad}/${id_clinica}`);
  }

  // Post Citas
  postCita(citaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/addcitas/agendar-cita`, citaData);
  }

  //Ver reseñas
  getResenias():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/resenias/infoResenias`);
  }

}
