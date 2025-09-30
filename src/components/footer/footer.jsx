import '../footer/footer.scss'
import logo from '../../styles/img/logo.png'

function Footer() {

    return (
        <div className="container">
            <div className='footerleft'>
                <img className='footerlogo' src={logo} />
            </div>
            <div className='footerright'>
                <span className='tm'>
                    Copyright | Kevin Roberts - Nexus Digital Design @ 2025
                </span>
            </div>
        </div>
    );
}

export default Footer;