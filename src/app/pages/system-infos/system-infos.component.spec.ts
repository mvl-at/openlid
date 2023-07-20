import {ComponentFixture, TestBed} from "@angular/core/testing";

import {SystemInfosComponent} from "./system-infos.component";

describe("ConfigurationDetailsComponent", () => {
  let component: SystemInfosComponent;
  let fixture: ComponentFixture<SystemInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemInfosComponent]
    });
    fixture = TestBed.createComponent(SystemInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
