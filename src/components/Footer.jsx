import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Daily Pulse</h3>
          <p>Your source for real-time news and market updates</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/business">Business</a></li>
            <li><a href="/technology">Technology</a></li>
            <li><a href="/sports">Sports</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://x.com/dev_x_aradhya" target="https://x.com/dev_x_aradhya">Twitter</a>
            <a href="https://www.linkedin.com/in/aradhya08oc01/" target="https://www.linkedin.com/in/aradhya08oc01/">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
      <p>©{new Date().getFullYear()} Made by  
        <a href="https://github.com/aradhya-7-7" target="https://github.com/aradhya-7-7"> Aradhya</a>
      </p>
      </div>
    </footer>
  );
}

export default Footer;
