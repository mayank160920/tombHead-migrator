import migrator from "../../data/migrator.json";
import { useWeb3Context } from "../../context/web3/Web3Context";

export async function migrateNFT(tokenId, migratorAddress, accountAddress) {
  const web3 = new window.Web3(window.ethereum);
  const migratorContract = new web3.eth.Contract(migrator.abi, migratorAddress);

  await migratorContract.methods.migrate(tokenId).estimateGas({
    from: accountAddress,
    value: 0
  });

  await migratorContract.methods.migrate(tokenId).send({
    from: accountAddress,
    value: 0
  });
}
