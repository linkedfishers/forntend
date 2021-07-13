import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentpecheComponent } from './equipmentpeche.component';

describe('EquipmentpecheComponent', () => {
  let component: EquipmentpecheComponent;
  let fixture: ComponentFixture<EquipmentpecheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentpecheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentpecheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
