import { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import artistDb from "../../../data/data.json";

import style from "./selectArtist.module.css";

export function SelectArtist(props) {
  const artists = Object.keys(artistDb);
  const options = artists.map((artist) => {
    return { value: artist, label: artist };
  });
  const [selectedArtist, selectArtist] = useState("");

  return (
    <div className={style.wrapper}>
      <img className={style.logo} src="./select.png" />
      <Select
        className={style.selectContainer}
        placeholder="Select an artist"
        options={options}
        onChange={({ value }) => selectArtist(value)}
      />
      <Link className={style.button} to={`/${selectedArtist}`}>
        Start Migration
      </Link>
    </div>
  );
}
