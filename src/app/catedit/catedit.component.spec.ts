import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateditComponent } from './catedit.component';

describe('CateditComponent', () => {
  let component: CateditComponent;
  let fixture: ComponentFixture<CateditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
