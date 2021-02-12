import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcreateComponent } from './catcreate.component';

describe('CatcreateComponent', () => {
  let component: CatcreateComponent;
  let fixture: ComponentFixture<CatcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
