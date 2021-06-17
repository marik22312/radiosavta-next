import React from "react";
import {
  RecordedShowPlayerProps,
  RecordedShowPlayer,
} from "./RecordedShowPlayer";

import { render } from "@testing-library/react";
import { Chance } from "chance";
import { RecordedShowPlayerDriver } from "./RecordedShowPlayer.driver";
const chance = Chance();

describe("RecordedShowsPlayer", () => {
  const renderPlayer = (props?: Partial<RecordedShowPlayerProps>) => {
    const defaultProps: RecordedShowPlayerProps = {
      url: chance.url(),
      backgroundImage: chance.url(),
      name: chance.name(),
      recordingDate: chance.date().toISOString(),
    };
    const component = render(
      <RecordedShowPlayer {...defaultProps} {...props} />
    );
    const driver = new RecordedShowPlayerDriver(component);
    return {
      driver,
    };
  };

  it("Should present title correctly", async () => {
    const name = chance.word();
    const { driver } = renderPlayer({
      name,
    });

    expect(await driver.getTitle()).toBe(name);
  });
  it("Should present date correctly", async () => {
    const date = chance.date();
    const { driver } = renderPlayer({
      recordingDate: date.toISOString(),
    });

    expect(await driver.getRecordingDate()).toBe(
      Intl.DateTimeFormat("he").format(date)
    );
  });

  it.todo("Should play audio when clicking play after render");
  it.todo("Should pause audio after playing it");
});
