import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreShelfComponent } from './score-shelf.component';

describe('ScoreShelfComponent', () => {
  let component: ScoreShelfComponent;
  let fixture: ComponentFixture<ScoreShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreShelfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
