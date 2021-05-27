import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMonitComponent } from './categories-monit.component';

describe('CategoriesMonitComponent', () => {
  let component: CategoriesMonitComponent;
  let fixture: ComponentFixture<CategoriesMonitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesMonitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMonitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
