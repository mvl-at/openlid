import {DebugDisplayPipe} from "./debug-display.pipe";

describe("DebugDisplayPipe", () => {
  it("create an instance", () => {
    const pipe = new DebugDisplayPipe();
    expect(pipe).toBeTruthy();
  });
});
