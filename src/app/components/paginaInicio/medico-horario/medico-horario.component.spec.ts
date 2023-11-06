import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoHorarioComponent } from './medico-horario.component';

describe('MedicoHorarioComponent', () => {
  let component: MedicoHorarioComponent;
  let fixture: ComponentFixture<MedicoHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
