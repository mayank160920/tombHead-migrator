import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Web3ContextProvider } from "./context/web3/Web3Context";
import { NFTScanProvider } from "./context/web3/NFTScannerContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Web3ContextProvider>
        <NFTScanProvider>
          <App />
        </NFTScanProvider>
      </Web3ContextProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
