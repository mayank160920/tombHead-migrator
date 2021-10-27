import React from "react";
import { Button } from "../";

import style from "./card.module.css";

export function Card(props) {
  return (
    <div className={style.card}>
      <img src={props.imageUrl} alt="image"></img>
      <div className={style.card__buttons}>
        <Button text="Approve" />
        <Button text="Migrate" />
      </div>
    </div>
  );
}
