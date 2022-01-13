import './App.css';
import React, { useEffect, useState } from 'react';
// Constants
const App = () => {
  const [hasWallet, setWalletState] = useState(false)
  // const [publicKey,setPublicKey] = useState('')
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');


  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          setWalletState(true)
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(response.publicKey)
          console.log('Connected with Public Key:', response.publicKey.toString());
          setWalletAddress(response.publicKey.toString());
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

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );


  const TEST_GIFS = [
    'https://th.bing.com/th/id/OIP.oDr-nDUbJD_vgr6hzXodjQHaEJ?pid=ImgDet&rs=1',
    'https://img.auzhu.com/upload/website_attach/wkHxAwwiRA+3pD9QSagCUks9EX+mJoztkwAe-WnjsAoiVR3+j37GvIU=F2WARJjPnt3xpv6Gs-QxwE_S+kzMR2ygx8RhvymLl.jpeg'
  ]

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange} />
        <button type="submit" className="cta-button submit-gif-button">Submit</button>
      </form>
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );


  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Family Pics</p>
          <p className="sub-text">
            View your family storys
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
      </div>
      <footer className="footer-container">
        <p className="footer-text">
          {hasWallet ? 'Phantom wallet found' : 'Not found phantom wallet'}
        </p>
        <p className="footer-text">
          Connected Public Key:{walletAddress}
        </p>
      </footer>
    </div>
  );
};

export default App;
