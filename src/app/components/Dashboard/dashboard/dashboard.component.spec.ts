import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

// Define a fake router service
class FakeRouter {
  navigateByUrl(url: string): Promise<boolean> {
    // You can add your own logic here if needed
    return Promise.resolve(true);
  }
}

@Component({
  template: `
    <button class="agrcita" (click)="navigateToAgendarCita()">Agendar Citas</button>
    <button class="lstcitas" (click)="navigateToListadoCitas()">Ver Citas</button>
  `,
})
class TestComponent {
  constructor(private router: Router) {}

  navigateToAgendarCita() {
    this.router.navigateByUrl('/agregar-cita');
  }
  navigateToListadoCitas() {
    this.router.navigateByUrl('/listado-citas');
  }
}

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: Router, useClass: FakeRouter }], // Use the fake router
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should navigate to "/agregar-cita" when the "Agendar Citas" button is clicked', () => {
    const navigateSpy = spyOn(fixture.debugElement.injector.get(Router), 'navigateByUrl');

    const agendarCitasButton = fixture.debugElement.query(By.css('.agrcita'));

    // Trigger a click event on the "Agendar Citas" button
    agendarCitasButton.nativeElement.click();

    fixture.detectChanges();

    // Check if the router's navigateByUrl method was called with the expected route
    expect(navigateSpy).toHaveBeenCalledWith('/agregar-cita');
  });

  it('should navigate to "/listado-citas" when the "Ver Citas" button is clicked', () => {
    const navigateSpy = spyOn(fixture.debugElement.injector.get(Router), 'navigateByUrl');

    const agendarCitasButton = fixture.debugElement.query(By.css('.lstcitas'));

    // Trigger a click event on the "Agendar Citas" button
    agendarCitasButton.nativeElement.click();

    fixture.detectChanges();

    // Check if the router's navigateByUrl method was called with the expected route
    expect(navigateSpy).toHaveBeenCalledWith('/listado-citas');
  });
});