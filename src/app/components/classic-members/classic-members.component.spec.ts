import {ComponentFixture, TestBed} from "@angular/core/testing";

import {ClassicMembersComponent} from "./classic-members.component";

describe("ClassicMembersComponent", () => {
  let component: ClassicMembersComponent;
  let fixture: ComponentFixture<ClassicMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicMembersComponent]
    });
    fixture = TestBed.createComponent(ClassicMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
