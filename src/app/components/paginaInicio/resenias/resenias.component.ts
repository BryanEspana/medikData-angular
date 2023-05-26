import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.component.html',
  styleUrls: ['./resenias.component.scss']
})
export class ReseniasComponent {
  rating: number = 4; // Aquí puedes establecer la calificación deseada
  resenias = [];

  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit(): void {
    this.getResenias();
  }

  getResenias(): void{
    this.apiService.getResenias().subscribe(
      data => this.resenias = data.resenias,
      error => console.log(error)
    )
  }

  regresar() {
    window.history.back();
  }
  @ViewChild('textoLimitado', { static: true }) textoLimitado!: ElementRef;
  texto: string = "Es un profesional excepcional y altamente calificado en su campo. Su dedicación y pasión por brindar atención médica de calidad son evidentes en cada interacción con sus pacientes. Desde el primer momento, el Dr. [Nombre del doctor] establece un ambiente acogedor y de confianza, lo que permite que los pacientes se sientan cómodos y seguros al compartir sus inquietudes y síntomas.";

  ngAfterViewInit() {
    const pElement: HTMLParagraphElement = this.textoLimitado.nativeElement;
    pElement.textContent = this.limitarTexto(this.texto, 200);
  }

  limitarTexto(texto: string, limite: number): string {
    if (texto.length > limite) {
      return texto.substring(0, limite) + "...";
    }
    return texto;
  }
}
