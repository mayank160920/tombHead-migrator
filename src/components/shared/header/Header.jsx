import React, { useState } from "react";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { Spinner } from "../index";
import style from "./header.module.css";

export function Header() {
  const { address, loading, connectAccount } = useWeb3Context();

  function parseAddress(_address) {
    return _address.slice(0, 4) + "..." + _address.slice(-4);
  }

  return (
    <div className={style.header}>
      <p className={style.header__heading} to="/">
        TombHeads Migrator
      </p>
      {address ? (
        <p>{parseAddress(address)}</p>
      ) : (
        <a className={style.connectButton} onClick={() => connectAccount()}>
          {loading ? <Spinner /> : "Connect Wallet"}
        </a>
      )}
    </div>
  );
}
