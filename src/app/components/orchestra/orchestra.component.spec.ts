import {ComponentFixture, TestBed} from "@angular/core/testing";

import {OrchestraComponent} from "./orchestra.component";

describe("OrchestraComponent", () => {
  let component: OrchestraComponent;
  let fixture: ComponentFixture<OrchestraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrchestraComponent]
    });
    fixture = TestBed.createComponent(OrchestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
