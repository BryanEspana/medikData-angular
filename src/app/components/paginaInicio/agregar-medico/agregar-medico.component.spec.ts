import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMedicoComponent } from './agregar-medico.component';

describe('AgregarMedicoComponent', () => {
  let component: AgregarMedicoComponent;
  let fixture: ComponentFixture<AgregarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
