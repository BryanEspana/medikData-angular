import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() {}

    //FORMA 1
  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt_token');
    return token ? true : false;
  }

  //FORMA 2 SI NO FUNCIONA LA 1
  public isLoggedIn(): boolean {
    
    const token = localStorage.getItem('access_token');
    
    interface TokenData {
        username: number;
        password: number;
      }
      
    if (!token) {
      // Si no hay token, el usuario no está autenticado
      return false;
    }
  
    // Decodificar el token para obtener la información que contiene
    const tokenData = jwt_decode<TokenData>(token);
  
    // Comprobar si el token ha expirado
    const now = Date.now().valueOf() / 1000; // Convertir a segundos
    if (tokenData.password < now) {
      // Si ha expirado, el usuario no está autenticado
      return false;
    }
  
    // Si hemos llegado hasta aquí, el token está presente y no ha expirado,
    // por lo que consideramos que el usuario está autenticado
    return true;
  }
  
}