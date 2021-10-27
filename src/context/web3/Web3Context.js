import { useState, createContext, useContext } from "react";

const Web3Context = createContext({});

export function Web3ContextProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [eventsRegistered, setEventsRegistered] = useState(false);

  async function connectAccount() {
    try {
      setLoading(true);

      // request account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(window.Web3.utils.toChecksumAddress(accounts[0]));

      // request chainId
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (parseInt(chainId) !== 250) {
        setError("Please select FTM Network in your wallet");
        return;
      }

      // check if events are registered
      if (!eventsRegistered) {
        registerEvents();
        setEventsRegistered(true);
      }
    } catch (error) {
      setAddress(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function registerEvents() {
    // accountChange Handler
    window.ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) {
        setAddress(null);
        setError("Connect Your Wallet to access the site");
      } else {
        setAddress(window.Web3.utils.toChecksumAddress(accounts[0]));
      }
    });

    // chainChange Handler
    window.ethereum.on("chainChanged", (newChainId) => {
      console.log("Network Changed to Chain Id : ", parseInt(newChainId));
      window.location.reload();
    });
    console.log("MetaMask Event Handlers Registered");
  }

  return (
    <Web3Context.Provider
      value={{
        address,
        loading,
        connectAccount,
        error,
        eventsRegistered,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

// optional -> we can make a hook for convenience
export function useWeb3Context() {
  return useContext(Web3Context);
}