import React, { useState } from "react";
import Slider from "@bit/mui-org.material-ui.slider";
import { withStyles } from "@bit/mui-org.material-ui.styles";

import styles from "./VolumeSlider.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeDown,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const OrangeSlider = withStyles({
  root: {
    color: "#CC9933 !important",
    height: 15,
    width: "4px !important",
    display: "flex",
    justifyContent: "center",
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "currentColor",
    marginTop: -8,
    marginLeft: "0 !important",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
    width: "4px !important",
  },
  rail: {
    height: 8,
    borderRadius: 4,
    width: "4px !important",
  },
})(Slider);

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (e: number | number[]) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = (
  props: VolumeSliderProps
) => {
  const [value, setValue] = useState<number>(1);

  const handleChange = (event: any, newValue: number | number[]) => {
    const val = Math.min(1, newValue as number);
    setValue(val);
    props.onVolumeChange(val);
  };

  const getVolumeIcon = () => {
    if (value === 0) {
      return faVolumeMute;
    } else if (value < 0.5) {
      return faVolumeDown;
    } else {
      return faVolumeUp;
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={getVolumeIcon() as any}
        width="20px"
        height="20px"
      />
      <div className={styles.sliderContainer}>
        <OrangeSlider
          className={styles.slider}
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-labelledby="vertical-slider"
          min={0}
          max={1}
          defaultValue={1}
          step={0.01}
        />
      </div>
    </>
  );
};

export default VolumeSlider;
