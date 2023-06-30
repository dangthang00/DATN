import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimkiemspComponent } from './timkiemsp.component';

describe('TimkiemspComponent', () => {
  let component: TimkiemspComponent;
  let fixture: ComponentFixture<TimkiemspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimkiemspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimkiemspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
