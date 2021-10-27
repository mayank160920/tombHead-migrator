import React from "react";
import style from "./button.module.css";

export function Button(props) {
  return (
    <a className={style.button} href="#" onClick={props.onClick}>
      {props.text}
    </a>
  );
}
