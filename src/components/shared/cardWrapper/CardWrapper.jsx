import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { useNFTScanner } from "../../../context/web3/NFTScannerContext";
import Loader from "react-loader-spinner";
import style from "./cardWrapper.module.css";

export function CardWrapper(props) {
  const artist = props.artist;
  const { address } = useWeb3Context();
  const { scanning, ownedNFTs, setOwnedNFTs, startScanning } = useNFTScanner();

  useEffect(() => {
    if (!scanning && address) {
      setOwnedNFTs([]);
      startScanning(artist);
    }
  }, [address]);

  if (!address) {
    return (
      <div className={style.connect_wallet_warning}>
        <img className={style.logo} src="./lock_logo.png" alt="img"></img>
        <p className={style.warning}>You need to connect your wallet first !</p>
      </div>
    );
  }

  if (scanning) {
    return (
      <div className={style.loadingContainer}>
        <p className={style.loadingText}>
          Searching For {artist.label} NFTs
          <br />
          Please Wait ...
        </p>
        <p className={style.loadingTextFg}>* This may take up to a minute</p>
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
      <div className={style.warning_container}>
        <img className={style.logo} src="./not_found.png" alt="img"></img>
        <p className={style.warning}>
          Wow ! Looks like you don't own any {artist.label} NFT :(
        </p>
        <Link className={style.backButton} to="/">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className={style.cardWrapper}>
      {ownedNFTs.map((nftId, index) => (
        <Card key={index} tokenId={nftId} artist={artist} />
      ))}
    </div>
  );
}
