import migrator from "../../data/migrator.json";
import { useWeb3Context } from "../../context/web3/Web3Context";

export async function migrateNFT(tokenId, addressToApprove, accountAddress) {
  const web3 = new Web3(window.ethereum);
  const migratorContract = new web3.eth.Contract(
    migrator.abi,
    migrator.address
  );

  const estimatedGas = await zftcContract.methods
    .migrate(tokenId)
    .estimatedGas({
      from: accountAddress,
      value: 0,
    });

  if (approvedAddress !== addressToApprove) {
    await zftcContract.methods.migrate(tokenId).send({
      from: accountAddress,
      value: 0,
    });
  }
}
