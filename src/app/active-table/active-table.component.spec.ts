import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTableComponent } from './active-table.component';

describe('ActiveTableComponent', () => {
  let component: ActiveTableComponent;
  let fixture: ComponentFixture<ActiveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
