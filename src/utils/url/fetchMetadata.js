import { fetchTokenURI } from "../web3/fetchTokenUri";
import { parseUrl } from "./parseUrl";

export async function fetchMetadata(tokenId,zftcAddress) {
  try {
    const tokenURI = await fetchTokenURI(tokenId,zftcAddress);
    const tokenUrl = parseUrl(tokenURI);
    const response = await fetch(tokenUrl);
    const data = await response.json();
    data.image = data.image ? parseUrl(data.image) : ""
    return data;
  } catch (error) {
    console.warn(error);
    return "";
  }
}
