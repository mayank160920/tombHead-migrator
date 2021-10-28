import React, { useState, useEffect } from "react";
import { Button } from "../";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { approveNFT } from "../../../utils/web3/approveNFT";
import { migrateNFT } from "../../../utils/web3/migrateNFT";
import { toast } from "react-toastify";
import { Spinner } from "../spinner/Spinner";
import { fetchImageUrl } from "../../../utils/url/fetchImageUrl";

import style from "./card.module.css";

export function Card({ tokenId }) {
  const { address } = useWeb3Context();

  const [btnBusy, setBtnBusy] = useState(false);
  const [approved, setApproved] = useState(false);
  const [migrated, setMigrated] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function approve() {
    if (btnBusy) {
      return;
    }
    try {
      setBtnBusy(true);
      await approveNFT(tokenId, address);
      toast.success("Approval Successfull");
      setApproved(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      toast.error("Approval Failed");
    } finally {
      setBtnBusy(false);
    }
  }

  async function migrate() {
    if (btnBusy) {
      return;
    }
    try {
      setBtnBusy(true);
      await migrateNFT(tokenId, address);
      toast.success("Migration Successfull");
      setMigrated(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      toast.error("Migration Failed");
    } finally {
      setBtnBusy(false);
    }
  }

  useEffect(() => {
    fetchImageUrl(tokenId).then((_imageUrl) => setImageUrl(_imageUrl));
  }, []);

  return (
    <div className={style.card}>
      {imageUrl ? (
        <img src={imageUrl} alt={`TombHead #${tokenId}`}></img>
      ) : (
        <div className={style.card__text}>TombHead #{tokenId}</div>
      )}

      <div className={style.card__buttons}>
        {!migrated ? (
          <>
            {approved ? (
              <Button
                text={btnBusy ? <Spinner /> : "Migrate"}
                onClick={migrate}
              />
            ) : (
              <Button
                text={btnBusy ? <Spinner /> : "Approve"}
                onClick={approve}
              />
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
