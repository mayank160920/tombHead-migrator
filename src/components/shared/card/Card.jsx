import React, { useState } from "react";
import { Button } from "../";
import { useWeb3Context } from "../../../context/web3/Web3Context";
import { approveNFT } from "../../../utils/web3/approveNFT";
import { migrateNFT } from "../../../utils/web3/migrateNFT";
import { toast } from "react-toastify";
import { Spinner } from "../spinner/Spinner";

import style from "./card.module.css";

export function Card(props) {
  const { address } = useWeb3Context();

  const [btnBusy, setBtnBusy] = useState(false);
  const [approved, setApproved] = useState(false);
  const [migrated, setMigrated] = useState(false);

  async function approve() {
    if (btnBusy) {
      return;
    }
    try {
      setBtnBusy(true);
      await approveNFT(props.tokenId, address);
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
      await migrateNFT(props.tokenId, address);
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

  return (
    <div className={style.card}>
      <div className={style.card__text}>TombHead #{props.tokenId}</div>
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
