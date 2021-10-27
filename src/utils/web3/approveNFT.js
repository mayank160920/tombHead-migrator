import zftc from "../../data/zftc.json";
import { useWeb3Context } from "../../context/web3/Web3Context";

export async function approveNFT(tokenId, addressToApprove, accountAddress) {
  const web3 = new Web3(window.ethereum);
  const zftcContract = new web3.eth.Contract(zftc.abi, zftc.address);
  const approvedAddress = await zftcContract.methods
    .getApproved(tokenId)
    .call();
  if (approvedAddress !== addressToApprove) {
    await zftcContract.methods.approve(addressToApprove, tokenId).send({
      from: accountAddress,
      value: 0,
    });
  }
}
