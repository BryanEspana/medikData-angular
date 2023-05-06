import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Función para realizar la Solicitud HTTP POST

  login(username:string, password: string){
    return this.http.post<any>('/login', {username, password});
  }

  onSubmit(): void{
    if(this.loginForm.invalid){
      console.log('----------------------------------------------------\nALERTA:',this.loginForm.value);
      return;
    }
    const {username, password} = this.loginForm.value;

    this.login(username, password).subscribe(
      (response) => {
        console.log('----------------------------------------------------\RESPONSE:',response);
        localStorage.setItem('jwt', response.jwt);
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
