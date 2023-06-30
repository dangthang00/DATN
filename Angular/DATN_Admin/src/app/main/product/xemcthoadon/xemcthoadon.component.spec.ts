import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemcthoadonComponent } from './xemcthoadon.component';

describe('XemcthoadonComponent', () => {
  let component: XemcthoadonComponent;
  let fixture: ComponentFixture<XemcthoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XemcthoadonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XemcthoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
