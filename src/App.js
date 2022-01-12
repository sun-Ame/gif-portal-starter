import './App.css';
import React, { useEffect,useState } from 'react';
// Constants
const App = () => {
  const [hasWallet,setWalletState] = useState(false)
  const [publicKey,setPublicKey] = useState('')
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          setWalletState(true)
          const response = await solana.connect({ onlyIfTrusted: true });
          setPublicKey(response.publicKey.toString())
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Family Pics</p>
          <p className="sub-text">
            View your family storys
          </p>
        </div>
      </div>
      <footer className="footer-container">
        <p className="footer-text">
          {hasWallet?'Phantom wallet found':'Not found phantom wallet'}
        </p>
        <p className="footer-text">
          Connected Public Key:{publicKey}
        </p>
        </footer>
    </div>
  );
};

export default App;
