import React, { useEffect } from "react";
import { Card } from "../";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { useNFTScanner } from "../../../context/web3/NFTScannerContext";
import Loader from "react-loader-spinner";
import style from "./cardWrapper.module.css";

export function CardWrapper(props) {
  const { address } = useWeb3Context();
  const { scanning, ownedNFTs, startScanning } = useNFTScanner();

  useEffect(() => {
    if (!scanning && address) {
      startScanning();
    }
  }, [address]);

  if (!address) {
    return (
      <>
        <img className={style.logo} src="./lock_logo.png" alt="img"></img>
        <p className={style.warning}>You need to connect your wallet first !</p>
      </>
    );
  }

  if (scanning) {
    return (
      <div className={style.loadingContainer}>
        <p className={style.loadingText}>
          Searching For TombHeads
          <br />
          Please Wait ...
        </p>
        <p className={style.loadingTextFg}>* This may take upto a minute</p>
        <Loader
          type="ThreeDots"
          color="yellow"
          height={50}
          width={50}
          style={{ textAlign: "center" }}
        />
      </div>
    );
  }

  if (!scanning && ownedNFTs.length === 0) {
    return (
      <>
        <img className={style.logo} src="./not_found.png" alt="img"></img>
        <p className={style.warning}>
          Wow ! Looks like you don't own any TombHead :(
        </p>
      </>
    );
  }

  return (
    <div className={style.cardWrapper}>
      {ownedNFTs.map((nftId, index) => (
        <Card key={index} tokenId={nftId} />
      ))}
    </div>
  );
}
