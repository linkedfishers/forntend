import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsbycatComponent } from './equipmentsbycat.component';

describe('EquipmentsbycatComponent', () => {
  let component: EquipmentsbycatComponent;
  let fixture: ComponentFixture<EquipmentsbycatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsbycatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsbycatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
