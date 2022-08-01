// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
// import { } from '@fortawesome/free-solid-svg-icons'

library.add(faFacebook, faTwitter, faYoutube, faInstagram )

const Footer = () => {
    return <>
        <footer className='footer-home'>
            <div className="copyright">
                <p><img src="images/footer-logo.svg" alt="Hppy" /></p>
                <p>&copy; 2022 Hppy | Team Pluto</p>
            </div>
            <div className="footer-nav">
                <ul>
                    <li><a href="#!">Features</a></li>
                    <li><a href="#!">Pricing</a></li>
                    <li><a href="#!">About</a></li>
                    <li><a href="#!">Contact</a></li>
                    <li><a href="#!">Security</a></li>
                    <li><a href="#!">Privacy</a></li>
                    <li><a href="#!">Terms</a></li>
                </ul>
            </div>
            <div className="footer-sns">
                <p>Follow Hppy</p>
                <ul>
                    <li><a href="#!"><FontAwesomeIcon icon={faFacebook} /></a></li>
                    <li><a href="#!"><FontAwesomeIcon icon={faYoutube} /></a></li>
                    <li><a href="#!"><FontAwesomeIcon icon={faTwitter} /></a></li>
                    <li><a href="#!"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
            </div>
            <div className="mobile-copy">
                &copy; 2022 Hppy | Team Pluto
            </div>
        </footer>
    </>
}

export default Footer