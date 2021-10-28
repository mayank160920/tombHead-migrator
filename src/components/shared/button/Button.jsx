import React from "react";
import style from "./button.module.css";

export function Button(props) {
  return (
    <button 
        className={props.disabled ? style.buttonDisabled : style.button} 
        onClick={props.onClick} 
        disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
