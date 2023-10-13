import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMedicosComponent } from './listado-medicos.component';

describe('ListadoMedicosComponent', () => {
  let component: ListadoMedicosComponent;
  let fixture: ComponentFixture<ListadoMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMedicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
