import React from "react";
import { Card } from "../";
import style from "./cardWrapper.module.css";

export function CardWrapper(props) {
  const multiplier = [...Array(50).keys()];

  return (
    <div className={style.cardWrapper}>
      {multiplier.map((id) => (
        <Card
          key={id}
          imageUrl="https://media.discordapp.net/attachments/890684698592944158/890692035449851954/unknown.png?width=250&height=250"
        />
      ))}
    </div>
  );
}
