import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PConfComponent } from './p-conf.component';

describe('PConfComponent', () => {
  let component: PConfComponent;
  let fixture: ComponentFixture<PConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
