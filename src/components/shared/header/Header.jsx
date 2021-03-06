import React, { useState, useEffect } from "react";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { Spinner } from "../index";
import style from "./header.module.css";
import { toast } from "react-toastify";

export function Header(props) {
  const artist = props.artist;
  const { address, loading, connectAccount, error } = useWeb3Context();

  function parseAddress(_address) {
    return _address.slice(0, 4) + "..." + _address.slice(-4);
  }

  useEffect(() => {
    if (address) {
      toast.success("Wallet Connected", { toastId: "address" });
    }
  }, [address]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => connectAccount(), []);

  return (
    <div className={style.header}>
      <p className={style.header__heading} to="/">
        {artist?.label || "NFT"} Migrator
      </p>
      {address ? (
        <p className={style.address}>{parseAddress(address)}</p>
      ) : (
        <a className={style.connectButton} onClick={() => connectAccount()}>
          {loading ? <Spinner /> : "Connect Wallet"}
        </a>
      )}
    </div>
  );
}
