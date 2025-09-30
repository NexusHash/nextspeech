import './styles/mainpage/main.scss';
import HeaderLogo from "./styles/img/logo.png";
import HeaderMain from './components/header/header';
import Footer from "./components/footer/footer"
import { useState } from 'react';
import TTS from './components/tts/tts';
import STT from './components/stt/stt';
import VT from './components/vt/vt';
import Welc from './components/welc/welc';

function App() {

  const [isTTSActive, setTTSActive] = useState(false);
  const [isSTTActive, setSSTActive] = useState(false);
  const [isVTActive, setVTActive] = useState(false);
  const [isWelcActive, setWelcActive] = useState(true);

  function TTStrue () {
    setTTSActive(true);
    setSSTActive(false);
    setVTActive(false);
    setWelcActive(false);
  }

   function SSTtrue () {
    setTTSActive(false);
    setSSTActive(true);
    setVTActive(false);
    setWelcActive(false);
   }

  function VTtrue () {
    setTTSActive(false);
    setSSTActive(false);
    setVTActive(true);
    setWelcActive(false);
  }

  return (
    <div className="main">
      <div className="header">
    <div className='header-logo'>
        <button className='header-btn'>
        <img src={HeaderLogo} alt='logo' className='img-logo'/>
        </button>
    </div>
    <div className='header-item'>
        <button className='header-btn'>
        <p className='header-text' onClick={TTStrue}>Text To Speech</p>
        <p className='header-text' onClick={SSTtrue}>Speech To Text</p>
        <p className='header-text' onClick={VTtrue}>Video Transcribing</p>
        </button>
    </div>
    </div>
      <div className="body">
        <div className='bodyItem'>
          {isWelcActive === true ? <Welc/>:
          isTTSActive === true ? <TTS/> :
          isSTTActive === true ? <STT/> :
          isVTActive === true ? <VT/> : ""}
        </div>
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
