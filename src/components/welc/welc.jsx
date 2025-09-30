import '../welc/welc.scss'
import logo from "../../styles/img/logo.png"

export default function Welc() {
    return (
        <div className="welcmain">
        <p className='head'>NextSpeech</p>
        <p> Click a mode to use in the Navigation Bar</p>
        <img src={logo} className='logo-fl' />
        </div>
    );
}