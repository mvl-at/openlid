import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardItemComponent } from './blackboard-item.component';

describe('BlackboardItemComponent', () => {
  let component: BlackboardItemComponent;
  let fixture: ComponentFixture<BlackboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackboardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
