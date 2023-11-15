import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDocsComponent } from './mis-docs.component';

describe('MisDocsComponent', () => {
  let component: MisDocsComponent;
  let fixture: ComponentFixture<MisDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisDocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
