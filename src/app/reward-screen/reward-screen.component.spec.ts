import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardScreenComponent } from './reward-screen.component';

describe('RewardScreenComponent', () => {
  let component: RewardScreenComponent;
  let fixture: ComponentFixture<RewardScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
