import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DoctorInfoService } from './mis-docs.service';

@Component({
  selector: 'app-mis-docs',
  templateUrl: './mis-docs.component.html',
  styleUrls: ['./mis-docs.component.scss']
})
export class MisDocsComponent {
  pacientetoken: string = '';
  medicosAsociados: any = [];
  id_clinica: number = 0;


  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private doctorInfoService: DoctorInfoService
  ) { }

  ngOnInit(): void {
    this.pacientetoken = localStorage.getItem('user_dpi') || '';
    this.route.params.subscribe((params) => {
      this.id_clinica = params['id_clinica'];
    });
    this.getMedicosAsociados();
  }

  getMedicosAsociados() {
    this.apiService.getMedicosAsociados(this.id_clinica, this.pacientetoken).subscribe(
      (response: any) => {
        this.medicosAsociados = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //regeresar a la pagina anterior
  regresar() {
    window.history.back();
  }

  selectedMedico(dpi: string, nombre: string) {
    this.doctorInfoService.setDoctorDpi(dpi);

    this.router.navigate([`/listado-citas/${nombre}`]);
  }

}