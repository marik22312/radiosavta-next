import React from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

import style from "./FormField.module.scss";

const ButtonIcon: React.FC<{ isLoading?: boolean; isSuccess?: boolean }> = (
  props
) => {
  if (props.isLoading) {
    return <FaSpinner />;
  }
  if (props.isSuccess) {
    return <FaCheckCircle />;
  }
  return null;
};

export interface FormFieldProps {
  label?: string;
  name?: string;
  type?: "text" | "textarea" | "submit";
  inputType?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  skin?: "success" | "loading";
  disabled?: boolean;
}
export const FormField: React.FC<FormFieldProps> = (props) => {
  if (props.type === "textarea") {
    return (
      <fieldset className={style.input}>
        <label htmlFor={`input-${props.name}`}>{props.label ?? ""}</label>
        <textarea
          disabled={props.disabled}
          id={props.name && `input-${props.name}`}
          name={props.name}
          placeholder={props.placeholder}
        />
      </fieldset>
    );
  }
  if (props.type === "submit") {
    const isLoading = props.skin === "loading";
    const isSuccess = props.skin === "success";
    return (
      <fieldset
        className={style.input}
        data-type="submit"
        data-skin={props.skin}
      >
        <span>
          <ButtonIcon isLoading={isLoading} isSuccess={isSuccess} />
        </span>
        <button type="submit" disabled={props.disabled}>
          {props.label ?? "שלח"}
        </button>
      </fieldset>
    );
  }

  return (
    <fieldset className={style.input}>
      <label htmlFor={`input-${props.name}`}>{props.label ?? ""}</label>
      <input
        disabled={props.disabled}
        type={props.inputType}
        id={props.name && `input-${props.name}`}
        name={props.name}
        placeholder={props.placeholder}
      />
    </fieldset>
  );
};
