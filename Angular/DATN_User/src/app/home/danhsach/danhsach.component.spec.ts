import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachComponent } from './danhsach.component';

describe('DanhsachComponent', () => {
  let component: DanhsachComponent;
  let fixture: ComponentFixture<DanhsachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
