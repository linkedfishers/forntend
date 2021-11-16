import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChekoutPageComponent } from './chekout-page.component';

describe('ChekoutPageComponent', () => {
  let component: ChekoutPageComponent;
  let fixture: ComponentFixture<ChekoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChekoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChekoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
