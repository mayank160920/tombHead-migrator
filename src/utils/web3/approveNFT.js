import zftc from "../../data/zftc.json";
import { useWeb3Context } from "../../context/web3/Web3Context";

export async function approveNFT(
  tokenId,
  zftcAddress,
  migratorAddress,
  accountAddress
) {
  const web3 = new window.Web3(window.ethereum);
  const zftcContract = new web3.eth.Contract(zftc.abi, zftcAddress);

  const approvedAddress = await zftcContract.methods
    .getApproved(tokenId)
    .call();

  if (approvedAddress !== migratorAddress) {
    await zftcContract.methods.approve(migratorAddress, tokenId).estimateGas({
      from: accountAddress,
      value: 0
    });

    await zftcContract.methods.approve(migratorAddress, tokenId).send({
      from: accountAddress,
      value: 0
    });
  }
}
