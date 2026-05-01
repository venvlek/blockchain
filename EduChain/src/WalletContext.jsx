import { createContext, useContext, useState, useCallback } from "react";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [publicKey,     setPublicKey]     = useState(null);
  const [connected,     setConnected]     = useState(false);
  const [requiresLogin, setRequiresLogin] = useState(true);

  // connect() is called AFTER PIN is verified — just sets state
  const connect = useCallback(async (key) => {
    setPublicKey(key);
    setConnected(true);
    setRequiresLogin(false);
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await window?.solana?.disconnect();
    } catch (_) {}
    setPublicKey(null);
    setConnected(false);
    setRequiresLogin(true);
  }, []);

  return (
    <WalletContext.Provider value={{
      publicKey,
      connected: connected && !requiresLogin,
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
