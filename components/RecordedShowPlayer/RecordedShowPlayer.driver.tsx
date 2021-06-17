import { RenderResult, waitFor } from "@testing-library/react";
import { Simulate } from "react-dom/test-utils";

export class RecordedShowPlayerDriver {
  constructor(private component: RenderResult) {}

  public async getTitle() {
    const title = await this.component.findByTestId("recorded-show-title");
    return title.textContent;
  }
  public async getRecordingDate() {
    const title = await this.component.findByTestId("recorded-show-date");
    return title.textContent;
  }
  public async clickPlayPause() {
    const title = await this.component.findByTestId("play-pause-button");
    Simulate.click(title);
  }
}
