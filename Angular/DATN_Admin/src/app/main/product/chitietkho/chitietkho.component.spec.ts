import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietkhoComponent } from './chitietkho.component';

describe('ChitietkhoComponent', () => {
  let component: ChitietkhoComponent;
  let fixture: ComponentFixture<ChitietkhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietkhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChitietkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
