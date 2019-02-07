import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassatoComponent } from './passato.component';

describe('PassatoComponent', () => {
  let component: PassatoComponent;
  let fixture: ComponentFixture<PassatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
