import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteguiderComponent } from './visiteguider.component';

describe('VisiteguiderComponent', () => {
  let component: VisiteguiderComponent;
  let fixture: ComponentFixture<VisiteguiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteguiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteguiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
