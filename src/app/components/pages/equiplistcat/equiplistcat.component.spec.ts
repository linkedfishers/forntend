import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiplistcatComponent } from './equiplistcat.component';

describe('EquiplistcatComponent', () => {
  let component: EquiplistcatComponent;
  let fixture: ComponentFixture<EquiplistcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiplistcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiplistcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
