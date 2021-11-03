import React, { useState, useEffect } from "react";
import { Button } from "../";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { approveNFT } from "../../../utils/web3/approveNFT";
import { migrateNFT } from "../../../utils/web3/migrateNFT";
import { toast } from "react-toastify";
import { Spinner } from "../spinner/Spinner";
import { fetchMetadata } from "../../../utils/url/fetchMetadata";

import style from "./card.module.css";

export function Card({ tokenId }) {
  const { address } = useWeb3Context();

  const [btnBusy, setBtnBusy] = useState(false);
  const [approved, setApproved] = useState(false);
  const [migrated, setMigrated] = useState(false);
  const [metadata, setMetadata] = useState({});

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
    fetchMetadata(tokenId).then((_metadata) => setMetadata(_metadata));
  }, []);

  useEffect(() => console.log('metadata : ',metadata),[metadata]);

  return (
    <div className={style.card}>
      {metadata.image ? (
        <img src={metadata.image} alt={`TombHead #${tokenId}`}></img>
      ) : (
        <div className={style.card__text}>TombHead #{tokenId}</div>
      )}

      {metadata.name ? (
        <p className={style.nftName}>{metadata.name}</p>
      ) : null
      }

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
