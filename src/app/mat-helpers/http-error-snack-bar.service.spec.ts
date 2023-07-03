import {TestBed} from "@angular/core/testing";

import {HttpErrorSnackBarService} from "./http-error-snack-bar.service";

describe("HttpErrorSnackBarService", () => {
  let service: HttpErrorSnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorSnackBarService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
