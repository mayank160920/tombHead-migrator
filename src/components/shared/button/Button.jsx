import React from "react";
import style from "./button.module.css";

export function Button(props) {
  return (
    <a className={style.button} href="#">
      {props.text}
    </a>
  );
}
