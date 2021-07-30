import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebergementsbycatComponent } from './hebergementsbycat.component';

describe('HebergementsbycatComponent', () => {
  let component: HebergementsbycatComponent;
  let fixture: ComponentFixture<HebergementsbycatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebergementsbycatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebergementsbycatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
