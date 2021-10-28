import { fetchTokenURI } from "../web3/fetchTokenUri";
import { parseUrl } from "./parseUrl";

export async function fetchImageUrl(tokenId) {
  try {
    const tokenURI = await fetchTokenURI(tokenId);
    const tokenUrl = parseUrl(tokenURI);
    const response = await fetch(tokenUrl);
    const data = await response.json();
    return parseUrl(data.image);
  } catch (error) {
    console.warn(error);
    return "";
  }
}
