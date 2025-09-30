import './header.scss';
import HeaderLogo from "../../styles/img/logo.png";

function HeaderMain() {
    <div className="header">
    <div className='header-logo'>
        <button className='header-btn'>
        <img src={HeaderLogo} alt='logo' className='img-logo'/>
        </button>
    </div>
    <div className='header-item'>
        <button className='header-btn'>
        <p className='header-text'>Text To Speech</p>
        <p className='header-text'>Speech To Text</p>
        <p className='header-text'>Video Transcribing</p>
        </button>
    </div>
    </div>
} export default HeaderMain;


