export const parseUri = (url) => {
  // const _proxy = 'https://cors-bypass.jmethew76.workers.dev/'
  // if (url.match(/https?:\/\//)) {
  //   return url;
  // }
  const ipfsMatch = url.match(/ipfs?:\/\/(.*)/);
  if (ipfsMatch) {
    return "https://ipfs.io/ipfs/" + ipfsMatch[1];
  }
  return url;
};
