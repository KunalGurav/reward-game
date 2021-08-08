import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivePointsComponent } from './give-points.component';

describe('GivePointsComponent', () => {
  let component: GivePointsComponent;
  let fixture: ComponentFixture<GivePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivePointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GivePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
