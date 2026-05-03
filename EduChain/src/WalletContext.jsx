import { createContext, useContext, useState, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [publicKey,     setPublicKey]     = useState(null);
  const [connected,     setConnected]     = useState(false);
  const [connecting,    setConnecting]    = useState(false);
  const [requiresLogin, setRequiresLogin] = useState(true);
  const [walletAdapter, setWalletAdapter] = useState(null);

  const connect = useCallback(async (key) => {
    const phantom = window?.solana;

    const adapter = {
      publicKey:           new PublicKey(key),
      signTransaction:     (tx) => phantom.signTransaction(tx),
      signAllTransactions: (txs) => phantom.signAllTransactions(txs),
    };

    setPublicKey(key);
    setWalletAdapter(adapter);
    setConnected(true);
    setRequiresLogin(false);
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await window?.solana?.disconnect();
    } catch (_) {}
    setPublicKey(null);
    setWalletAdapter(null);
    setConnected(false);
    setRequiresLogin(true);
  }, []);

  return (
    <WalletContext.Provider value={{
      publicKey,
      walletAdapter,
      connected: connected && !requiresLogin,
      connecting,
      requiresLogin,
      connect,
      disconnect,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
