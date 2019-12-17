import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlowingborderComponent } from './glowingborder.component';

describe('GlowingborderComponent', () => {
  let component: GlowingborderComponent;
  let fixture: ComponentFixture<GlowingborderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlowingborderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlowingborderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
