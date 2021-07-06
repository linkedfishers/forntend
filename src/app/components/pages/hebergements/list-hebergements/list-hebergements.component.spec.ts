import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHebergementsComponent } from './list-hebergements.component';

describe('ListHebergementsComponent', () => {
  let component: ListHebergementsComponent;
  let fixture: ComponentFixture<ListHebergementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHebergementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHebergementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
