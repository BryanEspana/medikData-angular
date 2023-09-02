import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastAlertService {

constructor() { }

showSuccess(message: string): void {
  Toast.fire({
    icon: 'success',
    title: message
  });
}
showError(message: string): void {
  Toast.fire({
    icon: 'error',
    title: message
  });
}
}
const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

