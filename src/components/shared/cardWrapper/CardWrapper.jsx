import React, { useEffect } from "react";
import { Card } from "../";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { useNFTScanner } from "../../../context/web3/NFTScannerContext";
import { fetchTokenURI } from "../../../utils/web3/fetchTokenUri";
import style from "./cardWrapper.module.css";

export function CardWrapper(props) {
  const { address } = useWeb3Context();
  const { scanning, ownedNFTs, startScanning } = useNFTScanner();


  useEffect(() => {
    if (!scanning && address) {
      startScanning();
    }}, [address]);

  if (!address) {
    return (
      <p className={style.warning}>You need to connect your wallet first !</p>
    );
  }

  return (
    <div className={style.cardWrapper}>
      {ownedNFTs.map((index) => (
          <Card
            key={index}
            tokenId={index}
          />
      ))}
    </div>
  );
}
