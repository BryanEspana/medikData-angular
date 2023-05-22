import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrConfigComponent } from './usr-config.component';

describe('UsrConfigComponent', () => {
  let component: UsrConfigComponent;
  let fixture: ComponentFixture<UsrConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsrConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsrConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
