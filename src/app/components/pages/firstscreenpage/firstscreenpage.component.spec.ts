import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstscreenpageComponent } from './firstscreenpage.component';

describe('FirstscreenpageComponent', () => {
  let component: FirstscreenpageComponent;
  let fixture: ComponentFixture<FirstscreenpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstscreenpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstscreenpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
