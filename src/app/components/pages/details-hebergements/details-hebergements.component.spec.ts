import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHebergementsComponent } from './details-hebergements.component';

describe('DetailsHebergementsComponent', () => {
  let component: DetailsHebergementsComponent;
  let fixture: ComponentFixture<DetailsHebergementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsHebergementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsHebergementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
