import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatangComponent } from './quatang.component';

describe('QuatangComponent', () => {
  let component: QuatangComponent;
  let fixture: ComponentFixture<QuatangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuatangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuatangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
