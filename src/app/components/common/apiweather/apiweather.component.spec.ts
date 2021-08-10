import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiweatherComponent } from './apiweather.component';

describe('ApiweatherComponent', () => {
  let component: ApiweatherComponent;
  let fixture: ComponentFixture<ApiweatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiweatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
