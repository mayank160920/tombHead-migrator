import React from "react";
import { Button } from "../";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { approveNFT } from "../../../utils/web3/approveNFT";
import { migrateNFT } from "../../../utils/web3/migrateNFT";
import style from "./card.module.css";

export function Card(props) {
  const { address } = useWeb3Context();
  return (
    <div className={style.card}>
      <div className={style.card__text}>TombHead #{props.tokenId}</div>
      <div className={style.card__buttons}>
        <Button text="Approve" onClick={() => approveNFT(props.tokenId)} />
        <Button text="Migrate" onClick={() => migrateNFT(props.tokenId)} />
      </div>
    </div>
  );
}
