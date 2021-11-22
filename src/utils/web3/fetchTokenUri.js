import zftc from "../../data/zftc.json";

export async function fetchTokenURI(index, zftcAddress) {
  const web3 = new window.Web3(window.ethereum);
  const zftcContract = new web3.eth.Contract(zftc.abi, zftcAddress);
  const tokenURI = await zftcContract.methods.tokenURI(index).call();
  return tokenURI;
}
