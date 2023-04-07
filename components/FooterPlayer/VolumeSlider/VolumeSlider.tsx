import React, { useState } from 'react';
import Slider from '@bit/mui-org.material-ui.slider';
import { withStyles, makeStyles, Theme, createStyles } from '@bit/mui-org.material-ui.styles';

import styles from './VolumeSlider.module.scss';

const OrangeSlider = withStyles({
  root: {
    color: '#CC9933',
    height: 15,
    width: '4px !important',
    display: 'flex',
    justifyContent: 'center',
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: 'currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
    width: '4px !important'
  },
  rail: {
    height: 8,
    borderRadius: 4,
    width: '4px !important'
  },
})(Slider);

const VolumeSlider: React.FC = (props: any) => {
  const [value, setValue] = useState<number>(30);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className={styles.sliderContainer}>
          <OrangeSlider 
                className={styles.slider}
                orientation="vertical"
                value={value} 
                onChange={handleChange} 
                aria-labelledby="vertical-slider" 
            />
    </div>
  );
}

export default VolumeSlider;