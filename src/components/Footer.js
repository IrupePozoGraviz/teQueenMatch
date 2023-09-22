import React from 'react';
import './css/footer.css';
/* import github from '../assets/github.png';
 */
const Footer = () => {
  return (
    <div className="footer-container">
      <p className="footer-text">
        © 2021 teQueenMatch | All rights reserved
      </p>
      <p className="footer-text">
        Made by Irupe Pozo Graviz & Annika Lindberg at Technigo Bootcamp 2023
      </p>
      {/*       <div className="footer-icons">
        <a href="https://github.com/annikalindberg" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="Github-icon" className="github-icon" />
          <p className="link-text">Annika</p>
        </a>
        <a href="https://github.com/IrupePozoGraviz" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="Github-icon" className="github-icon" />
          <p className="link-text">Irupè</p>
        </a>
      </div> */}
    </div>
  );
}

export default Footer;
