import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Resenias } from 'src/app/interfaces/resenias';
@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.component.html',
  styleUrls: ['./resenias.component.scss']
})
export class ReseniasComponent {
   // Aquí puedes establecer la calificación deseada
  resenias: Resenias[] = [];

  constructor(
    private apiService: ApiService,
  ){}
  //-------------------------------------Obtener las reseñas-------------------------------------
  
  ngOnInit(): void {
    this.getResenias();
  }


  getResenias(): void{
    this.apiService.getResenias().subscribe(
      data => this.resenias = data.resenias,
      error => console.log(error)
    )
  }

    //regeresar a la pagina anterior
    regresar() {
      window.history.back();
    }




}
