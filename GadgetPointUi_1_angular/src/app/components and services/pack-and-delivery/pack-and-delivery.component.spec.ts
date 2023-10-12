import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackAndDeliveryComponent } from './pack-and-delivery.component';

describe('PackAndDeliveryComponent', () => {
  let component: PackAndDeliveryComponent;
  let fixture: ComponentFixture<PackAndDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackAndDeliveryComponent]
    });
    fixture = TestBed.createComponent(PackAndDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
