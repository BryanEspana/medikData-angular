import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletorComponent } from './skeletor.component';

describe('SkeletorComponent', () => {
  let component: SkeletorComponent;
  let fixture: ComponentFixture<SkeletorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
