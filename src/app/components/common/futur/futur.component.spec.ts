import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturComponent } from './futur.component';

describe('FuturComponent', () => {
  let component: FuturComponent;
  let fixture: ComponentFixture<FuturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
