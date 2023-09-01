import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input fields and submit button', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should call onSubmit when form is submitted with valid data', fakeAsync(() => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));

    // Simulate user input
    emailInput.nativeElement.value = 'test@example.com';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.value = 'password123';
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    tick();

    expect(component.onSubmit).toHaveBeenCalled();
  }));
});