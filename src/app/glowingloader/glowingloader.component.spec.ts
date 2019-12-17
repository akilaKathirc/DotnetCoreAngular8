import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlowingloaderComponent } from './glowingloader.component';

describe('GlowingloaderComponent', () => {
  let component: GlowingloaderComponent;
  let fixture: ComponentFixture<GlowingloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlowingloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlowingloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
