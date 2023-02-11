import React, { CSSProperties } from 'react';
import { Colors } from './Colors';
import style from './Typography.module.scss';

export interface HeadingProps {
	color?: Colors;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export const Heading: React.FC<HeadingProps> = (props) => {
	const defaultStyle: CSSProperties = {
		color: props.color || Colors.SAVTA_RED,
	}
	
	if (props.as) {
		return <props.as className={style.title} style={defaultStyle}>{props.children}</props.as>;

	}

	return (
		<h1 className={style.title} style={defaultStyle}>{props.children}</h1>
	)
};