import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesbycatComponent } from './servicesbycat.component';

describe('ServicesbycatComponent', () => {
  let component: ServicesbycatComponent;
  let fixture: ComponentFixture<ServicesbycatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesbycatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesbycatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
