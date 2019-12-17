import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlowingtextComponent } from './glowingtext.component';

describe('GlowingtextComponent', () => {
  let component: GlowingtextComponent;
  let fixture: ComponentFixture<GlowingtextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlowingtextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlowingtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
