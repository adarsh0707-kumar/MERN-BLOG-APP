import React from 'react';
import '../Footer/Footer.css';
import DeveloperImage from '../../assets/development.svg';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon  from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <div className='footer'>

            <div className="footer__logo">
                <img
                    className="footer__logo__img"
                    src={DeveloperImage}
                    alt='developer' />
            </div>

            <div className="footer__nav">
                <InstagramIcon />
                <FacebookIcon />
                <TwitterIcon />
                <GitHubIcon />
            </div>

        </div>
    )
}

export default Footer