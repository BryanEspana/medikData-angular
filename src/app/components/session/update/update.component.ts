import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastAlertService } from 'src/app/services/toastAlert/toastAlert.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;
  showPassword = false;
  accessToken: string = '';
  refreshToken: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastAlertService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      accessToken: [''],
    });
    const url = window.location.href;
    this.accessToken = new URL(url).hash.split('&')[0].split('=')[1];
    this.refreshToken = new URL(url).hash.split('=')[4].split('&')[0];
  }

  onSubmit(): void {
    console.log("password", this.updateForm.value.password)
    if (this.updateForm.valid && this.updateForm.value.password === this.updateForm.value.confirmPassword) {
      this.apiService.resetPassword(this.updateForm.value.password, this.accessToken, this.refreshToken).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Contraseña actualizada!',
            text: 'Ahora puedes iniciar sesión con tu nueva contraseña',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.toast.showError(error.error.message);
        }
      );
    } else {
      this.toast.showError('Las contraseñas no coinciden');
    }
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}