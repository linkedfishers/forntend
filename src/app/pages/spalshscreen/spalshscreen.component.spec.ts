import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpalshscreenComponent } from './spalshscreen.component';

describe('SpalshscreenComponent', () => {
  let component: SpalshscreenComponent;
  let fixture: ComponentFixture<SpalshscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpalshscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpalshscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
