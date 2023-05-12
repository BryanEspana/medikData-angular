import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router) {}

  canActivate():boolean{
    const token = localStorage.getItem('jwt');
    if(token){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
