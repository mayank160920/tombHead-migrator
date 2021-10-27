import React from "react";
import { useWeb3Context } from "./context/web3/Web3Context";
import style from "./header.module.css";

export function Header() {
  return (
    <div className={style.header}>
      <p className={style.header__heading} to="/">
        TombHeads Migrator
      </p>
      <a className={style.connectButton} onClick={""}>
        Connect Wallet
      </a>
    </div>
  );
}
