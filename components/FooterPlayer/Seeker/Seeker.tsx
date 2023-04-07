import React, { useState } from "react";
import styles from "./Seeker.module.scss";
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

// const SeekerSlider = withStyles({
//   root: {
//     color: '#8F8989',
//     height: 10,
//   },
//   thumb: {
//     height: 15,
//     width: 15,
//     backgroundColor: 'currentColor',
//     marginTop: -8,
//     marginLeft: -12,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

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

  const [value, setValue] = useState<number>(0);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleFinalChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
    onSeek(newValue);
  };

  return (
    <div className={styles.seekerWrapper}>
      <SeekerSlider
        ref={ref}
        min={0}
        defaultValue={0}
        max={durationTime}
        className={styles.seeker}
        onChange={handleChange}
        value={value}
        onChangeCommitted={handleFinalChange}
        valueLabelFormat={formatTime}
        valueLabelDisplay="auto"
      />
    </div>
  );
});
