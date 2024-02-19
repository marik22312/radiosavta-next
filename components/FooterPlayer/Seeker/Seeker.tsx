import React from "react";
import {Slider} from '@mui/material'

function formatTime(seconds: any) {
  let minutes: string | number = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

interface SeekerProps {
  currentTime: number;
  durationTime: number;
  onSeek: (e: any) => void;
}



export const Seeker = React.forwardRef<any, SeekerProps>(function Seeker(
  props,
  ref: any
) {
  const { onSeek, currentTime, durationTime } = props;

  const handleChange = (event: any, newValue: number | number[]) => {
    onSeek(newValue);
  };

  return (
    <div>
      <Slider
        ref={ref}
        min={0}
        defaultValue={0}
        max={durationTime}
        onChange={handleChange}
        value={currentTime}
        valueLabelFormat={formatTime}
        valueLabelDisplay="auto"
      />
    </div>
  );
});
