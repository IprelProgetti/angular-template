import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkOneComponent } from './linkone.component';

describe('LinkOneComponent', () => {
  let component: LinkOneComponent;
  let fixture: ComponentFixture<LinkOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
