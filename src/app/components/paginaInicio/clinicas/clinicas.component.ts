import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss']
})
export class ClinicasComponent {
  pacientetoken: string = '';
  clinicasAsociadas: any = [];


  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pacientetoken = localStorage.getItem('user_dpi') || '';
    this.getClinicasAsociadas();
  }

  getClinicasAsociadas() {
    this.apiService.getClinicasAsociadas(this.pacientetoken).subscribe(
      (response: any) => {
        this.clinicasAsociadas = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectedClinica(id_clinica: number) {
    this.router.navigate([`/clinica/${id_clinica}/mis-doctores`])
  }

  //regeresar a la pagina anterior
  regresar() {
    window.history.back();
  }

}
