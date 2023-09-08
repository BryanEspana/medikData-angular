import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicasComponent } from './clinicas.component';

describe('ClinicasComponent', () => {
  let component: ClinicasComponent;
  let fixture: ComponentFixture<ClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get clinics', () => {
    expect(component).toBeTruthy();
  });
  
  it('should get clinics by medic', () => {
    expect(component).toBeTruthy();
  });
});
