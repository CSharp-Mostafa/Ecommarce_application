import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionComponent } from './requisition.component';

describe('RequisitionComponent', () => {
  let component: RequisitionComponent;
  let fixture: ComponentFixture<RequisitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequisitionComponent]
    });
    fixture = TestBed.createComponent(RequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
