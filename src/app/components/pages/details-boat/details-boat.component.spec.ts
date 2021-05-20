import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBoatComponent } from './details-boat.component';

describe('DetailsBoatComponent', () => {
  let component: DetailsBoatComponent;
  let fixture: ComponentFixture<DetailsBoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
