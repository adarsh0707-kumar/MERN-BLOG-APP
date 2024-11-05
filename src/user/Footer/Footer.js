import React from 'react';
import '../Footer/Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>

            <div className="footer__logo">


                <img
                    className='footer__logo__img'
                    src={require('../../assets/a.png')}
                    alt='Adarsh' />


            </div>

            <div className="footer__nav">
                <Link
                    to='https://www.instagram.com/i_.a_k/'
                    target="_blank"
                    className='footer__nav__link'>
                    <InstagramIcon />
                    <span
                        className='footer__nav__link__span'>
                        Instagram
                    </span>

                </Link>

                <Link
                    to='https://www.facebook.com/I.A.Kr.GUPTA/'
                    target='_blank'
                    className='footer__nav__link'>
                    <FacebookIcon />
                    <span
                        className='footer__nav__link__span'>
                        Facebook
                    </span>

                </Link>

                <Link
                    to='https://x.com/i__a_k/'
                    target='_blank'
                    className='footer__nav__link'>
                    <TwitterIcon />
                    <span
                        className='footer__nav__link__span'>
                        Twitter
                    </span>

                </Link>

                <Link
                    to='https://github.com/adarsh0707-kumar/'
                    target='_blank'
                    className='footer__nav__link'>
                    <GitHubIcon />
                    <span
                        className='footer__nav__link__span'>
                        GitHub
                    </span>

                </Link>

                <Link
                    to='https://www.linkedin.com/in/adarsh-kumar-657315251'
                    target='_blank'
                    className='footer__nav__link'>
                    <LinkedInIcon />
                    <span
                        className='footer__nav__link__span'>
                        LinkedIn
                    </span>
                </Link>


                <Link
                    to='https://wa.me/917209798901'
                    target='_blank'
                    className='footer__nav__link'>
                    <WhatsAppIcon />
                    
                    <span
                        className='footer__nav__link__span'>
                        WhatsApp
                    </span>
                </Link>


            </div>

        </div>
    )
}

export default Footer