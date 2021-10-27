import { useState, createContext, useContext } from "react";

const Web3Context = createContext();

function Web3ContextProvider({ children }) {
  const [account, setAccount] = useState({
    address: null,
    chain: null,
    loading: false
  });
  const [error, setError] = useState(null);
  const [eventsRegistered, setEventsRegistered] = useState(false);

  async function connectAccount() {
    try {
      setAccount({ loading: true });

      // request account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccount({ address: window.Web3.utils.toChecksumAddress(accounts[0]) });

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
      setAccount({ address: null });
      setError(error.message);
    } finally {
      setAccount({ loading: false });
    }
  }

  function registerEvents() {
    // accountChange Handler
    window.ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) {
        setAccount({ address: null });
        setError("Connect Your Wallet to access the site");
      } else {
        setAccount({
          address: window.Web3.utils.toChecksumAddress(accounts[0])
        });
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
        account,
        setAccount,
        connectAccount,
        error,
        eventsRegistered
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
