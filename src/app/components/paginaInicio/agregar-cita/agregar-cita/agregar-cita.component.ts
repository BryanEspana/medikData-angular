import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.scss'],
})
export class AgregarCitaComponent {
  //SEleccionar fecha

  isDropdownAbove: boolean = false;
  selectedEspecialidad: string = 'Seleccionar';
  selectedClinica: string = 'Seleccionar';
  selectedMedico: string = 'Seleccionar';
  especialidades: string[] = [];
  clinicas: { nombre: string, id_clinica: number }[] = [];
  // medicos: string[] = [];
  medicos: { full_name: string, dpi: string }[] = [];
  selectedID_clinica: number = 0;
  token = localStorage.getItem('jwt');
  citaForm!: FormGroup;
  pacientetoken: string = '';
  nameUser: string = '';
  medicodpi: string = '';
  availableDates: Date[] = [];
  availableTimes: string[] = [];
  selectedDate: Date | null | undefined;
  selectedTime: string = '';
  filteredTimes: string[] = [];


  //Proceso de Agendar cita:
  currentStep: number = 1;
  stepsCompleted: { [key: string]: boolean } = {
    especialidad: false,
    clinica: false,
    medico: false,
    fecha: false,
  };

  stepEnabled: { [key: string]: boolean } = {
    especialidad: true,
    clinica: false,
    medico: false,
    fecha: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.initializeDpi();
    this.initializeName();
  }

  ngOnInit(): void {
    this.fetchClinicasFromDatabase();
    this.initializeCitaForm();
  }

  initializeCitaForm(): void {
    this.citaForm = this.formBuilder.group({
      pacientetoken: this.pacientetoken,
      clinicatoken: ['', Validators.required],
      medicotoken: ['', Validators.required],
      hora: ['', Validators.required],
      fecha: ['', Validators.required],
    });
    //solo mostrar el name user

  }

  initializeDpi(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      this.pacientetoken = payload.user_metadata.dpi;
    }
  }
  initializeName(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      console.log("payload", payload);
      this.nameUser = payload.user_metadata.full_name;
      console.log(this.nameUser);
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownAbove = !this.isDropdownAbove;
  }

  selectOption(option: any, field: string): void {
    switch (field) {
      case 'clinica':
        this.selectedClinica = option.nombre;
        this.selectedID_clinica = option.id_clinica;
        this.fetchSpecialtiesForClinic(option.id_clinica);
        this.selectedEspecialidad = 'Seleccionar';
        this.selectedMedico = 'Seleccionar';
        this.citaForm.patchValue({ clinicatoken: option.id_clinica });
        break;
      case 'especialidad':
        this.selectedEspecialidad = option;
        this.selectedMedico = 'Seleccionar';
        const normalizedOption = option.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        this.fetchDoctorsForClinicAndSpecialty(this.selectedID_clinica, normalizedOption);
        break;
      case 'medico':
        this.selectedMedico = `${option.full_name}`;
        this.citaForm.patchValue({ medicotoken: option.dpi });
        this.medicodpi = option.dpi;
        this.fetchAvailableDates();
        break;
      default:
        break;
    }
  }

  fetchClinicasFromDatabase(): void {
    this.apiService.getClinicas().subscribe(
      (response: any) => {
        if (response && response.clinicas) {
          this.clinicas = response.clinicas.map((clinic: any) => ({
            nombre: clinic.nombre,
            id_clinica: clinic.id_clinica
          }));
        } else {
          Swal.fire({
            title: 'Error',
            text: 'response',
            icon: 'error'
          }).then(() => {
          });
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching clinics:', error);
      }
    );
  }

  fetchSpecialtiesForClinic(id_clinica: number): void {
    this.apiService.getEspecialidades(id_clinica).subscribe(
      (response: any) => {
        if (response && response.especialidades) {
          this.especialidades = response.especialidades.flatMap((especialidad: any) => especialidad.medico.map((medico: any) => medico.especialidad));
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching specialties:', error);
      }
    );
  }


  fetchDoctorsForClinicAndSpecialty(id_clinica: number, especialidad: string): void {
    this.apiService.getMedicos(id_clinica, especialidad).subscribe(
      (response: any) => {
        if (response && response.medico) {
          this.medicos = response.medico.map((medico: any) => ({ full_name: medico.full_name, dpi: medico.dpi }));
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  fetchAvailableDates() {
    // Replace 'yourDpi' with the actual DPI value of the selected doctor
    console.log('medico dpi:', this.medicodpi)
    this.apiService.getHorarios(this.medicodpi).subscribe(
      (response: any) => {
        console.log(response)
        if (response && response.horarios) {
          console.log(response.horarios)

          // Separate arrays for dates and times
          const datesArray: Date[] = [];
          const timesArray: string[] = [];

          // Map the response to extract and store dates and times
          response.horarios.forEach((horario: any) => {
            const dateStr = `${horario.fecha}T${horario.hora}`;
            datesArray.push(new Date(dateStr));
            timesArray.push(horario.hora);
          });

          this.availableDates = datesArray;
          this.availableTimes = timesArray;

          console.log('available dates', this.availableDates);
          console.log('available times', this.availableTimes);
        } else {
          console.error('Invalid response:', response);
        }
      },
      (error) => {
        console.error('Error fetching available dates:', error);
      }
    );
  }

  dateFilter = (date: Date | null): boolean => {
    if (date) {
      // Check if the date is in availableDates
      return this.availableDates.some(
        (availableDate) => {
          const availableYear = availableDate.getFullYear();
          const availableMonth = availableDate.getMonth();
          const availableDay = availableDate.getDate();
          const selectedYear = date.getFullYear();
          const selectedMonth = date.getMonth();
          const selectedDay = date.getDate();
          return (
            availableYear === selectedYear &&
            availableMonth === selectedMonth &&
            availableDay === selectedDay
          );
        }
      );
    }
    return false; // Disable null dates
  };

  updateFilteredTimes(): void {
    this.selectedDate = this.citaForm.value.fecha;
  
    if (this.selectedDate) {
      const selectedDateString = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
  
      // Filter the available times to include only those that have the same date
      this.filteredTimes = this.availableTimes.filter((time, index) => {
        const date = this.availableDates[index];
        const dateStr = formatDate(date, 'yyyy-MM-dd', 'en-US');
        return dateStr === selectedDateString;
      });
    } else {
      this.filteredTimes = [];
    }
  }  
  
  onAgendarClick(): void {
    const selectedMedico = this.medicos.find((medico) => `${medico.full_name}` === this.selectedMedico);
    if (!selectedMedico) {
      console.error('Medico no encontrado');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Medico no encontrado'
      })
      return;
    }

    if (this.citaForm.valid) {
      const citaData = this.citaForm.value;

      this.apiService.postCita(citaData).subscribe(
        (response: any) => {
          console.log("Cita agendada con exito", response)
          this.router.navigate(['/citas-pendientes']);
        },
        (error) => {
          console.error('Error agendando cita:', error);
        }
      );
    } else {
      console.error('Formulario invalido');
    }
  }
}
