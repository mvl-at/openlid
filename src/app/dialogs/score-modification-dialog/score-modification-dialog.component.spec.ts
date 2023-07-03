import {ComponentFixture, TestBed} from "@angular/core/testing";

import {ScoreModificationDialogComponent} from "./score-modification-dialog.component";

describe("ScoreModificationDialogComponent", () => {
  let component: ScoreModificationDialogComponent;
  let fixture: ComponentFixture<ScoreModificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreModificationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreModificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
