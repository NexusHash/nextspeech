import './styles/mainpage/main.scss';
import HeaderLogo from "./styles/img/logo.png";
import HeaderMain from './components/header/header';
import Footer from "./components/footer/footer";
import { useState } from 'react';
import TTS from './components/tts/tts';
import STT from './components/stt/stt';
import VT from './components/vt/vt';
import Welc from './components/welc/welc';

function App() {
  const [activeView, setActiveView] = useState("welc");

  const renderComponent = () => {
    switch (activeView) {
      case "tts":
        return <TTS />;
      case "stt":
        return <STT />;
      case "vt":
        return <VT />;
      default:
        return <Welc />;
    }
  };

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
            <p className='header-text' onClick={() => setActiveView("tts")}>Text To Speech</p>
            <p className='header-text' onClick={() => setActiveView("stt")}>Speech To Text</p>
            <p className='header-text' onClick={() => setActiveView("vt")}>Video Transcribing</p>
          </button>
        </div>
      </div>

      <div className="body">
        <div className='bodyItem'>
          {renderComponent()}
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
