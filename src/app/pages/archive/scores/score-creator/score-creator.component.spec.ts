import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCreatorComponent } from './score-creator.component';

describe('ScoreCreatorComponent', () => {
  let component: ScoreCreatorComponent;
  let fixture: ComponentFixture<ScoreCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
