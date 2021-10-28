import { useState, createContext, useContext } from "react";
import zftc from "../../data/zftc.json";
import { nftList } from "../../data/nftIndex.json";
import { useWeb3Context } from "./Web3Context";

const NFTScannerContext = createContext({});

export function NFTScanProvider(props) {
  const { address } = useWeb3Context();
  const [scanning, setScanning] = useState(false);
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  async function startScanning() {
    setScanning(true);

    const web3 = new window.Web3(window.ethereum);
    const zftcContract = new web3.eth.Contract(zftc.abi, zftc.address);
    for (let index of nftList) {
      try {
        const result = await zftcContract.methods.ownerOf(index).call();
        if (result === address) {
          setOwnedNFTs((oldOwnerNFTs) => [...oldOwnerNFTs, index]);
        }
      } catch (error) {
        console.warn(error);
      }
    }

    setScanning(false);
  }

  return (
    <NFTScannerContext.Provider
      value={{
        scanning,
        startScanning,
        ownedNFTs,
        setOwnedNFTs
      }}
    >
      {props.children}
    </NFTScannerContext.Provider>
  );
}

// optional -> we can make a hook for convenience
export function useNFTScanner() {
  return useContext(NFTScannerContext);
}
