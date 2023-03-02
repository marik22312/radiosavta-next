import React from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import style from './Alert.module.scss'

export enum AlertType {
	SUCCESS = "success",
	ERROR = "error",
  }
  
  export interface AlertProps {
	type: "success" | "error";
	text: string;
  }
  export const Alert: React.FC<AlertProps> = (props) => {
	return (
	  <div className={style.notification} data-type={props.type}>
		<span>
		  {props.type === AlertType.SUCCESS ? (
			<FaCheckCircle size={25} />
		  ) : (
			<FaTimesCircle size={25} />
		  )}
		</span>
		<p>{props.text}</p>
	  </div>
	);
  };