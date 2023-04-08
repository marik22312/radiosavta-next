import React from "react";
import Slider from '@bit/mui-org.material-ui.slider';
import { withStyles } from '@bit/mui-org.material-ui.styles';

function formatTime(seconds: any) {
    let minutes: string | number = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

interface SeekerProps {
	currentTime: number;
	durationTime: number;
	onSeek: (e: any) => void;
}

const SeekerSlider = withStyles({
  root: {
    color: '#8F8989',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export const Seeker = React.forwardRef<
  any,
  SeekerProps
>(function Seeker(props, ref: any) {
  const { onSeek, currentTime, durationTime } = props;

  const handleChange = (event: any, newValue: number | number[]) => {
    onSeek(newValue);
  };

  return (
    <div>
      <SeekerSlider
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
