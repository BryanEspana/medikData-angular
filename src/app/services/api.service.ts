import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://medikdata-backend-ec6d-dev.fl0.io'; // Asegúrate de reemplazar esto con la URL de tu backend

  constructor(private http: HttpClient) { }


  //Auth
  getUser(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
  getResenias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/resenias/infoResenias`);
  }

  // Obtener Citas paciente
  getCitasPendientes(dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/citaspendientes/${dpi}`);
  }
  // Obtener citas medico
  getCitasPendientesMedico(dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/citaspendientesmedico/${dpi}`);
  }
  getCitasPendientesCitaID(citaid: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/citaspendientescitaid/${citaid}`);
  }
  getCitaDiagnostico(citaid: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/citadiagnostico/${citaid}`);
  }

  getCitas(dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/citaspaciente/${dpi}`);
  }

  // Anular cita pendiente
  deleteCita(citaid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/citas/anularcita/${citaid}`);
  }

  // Obtener id de la clinica
  getClinicaID(dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/clinica/${dpi}`);
  }

  // Clinicas asociadas al paciente
  getClinicasAsociadas(dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/clinicasasociadas/${dpi}`);
  }

  // Obtener Medicos de la clinica asociada al paciente
  getMedicosAsociados(id_clinica: number, dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/medicosasociados/${id_clinica}/${dpi}`);
  }

  // Obtener citas pendientes del medico asociado al paciente
  getCitasPendientesMedicoAsociado(pacientedpi: string, medicodpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/citasPorPacienteYMedico/${pacientedpi}/${medicodpi}`);
  }

  getCitaCompletaPDF(citaid: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/citas/citacompledata/${citaid}`, { responseType: 'arraybuffer' });
  }

  // Obtener Medicos de la clinica
  getMedicosClinica(dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/medico/${dpi}`);
  }

  //Horarios del medico
  getHorarios(dpi: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/medico/horarios/${dpi}`);
  }

  updateHorario(horario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/medico/updatehorarios`, horario);
  }
  deleteHorario(horario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/medico/deletehorario`, horario);
  }

  // Update diagnostico
  updateDiagnostico(citaid: number, diagnostico: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/medico/diagnostico/${citaid}`, diagnostico);
  }

  // Agregar horario
  postHorario(horarioData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/medico/horarios/addhorario`, horarioData);
  }

  // Recover account
  recuperarCuenta(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/recover`, { email: email });
  }

  resetPassword(password: string, accessToken: string, refreshToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/reset`, { newPassword: password, accessToken: accessToken, refreshToken: refreshToken });
  }

}
