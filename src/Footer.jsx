import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h4>Product</h4>
                    <ul>
                        <li>Public docs</li>
                        <li>API docs</li>
                        <li>Internal docs</li>
                        <li>Open source</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Features</h4>
                    <ul>
                        <li>Visitor authentication</li>
                        <li>Git Sync</li>
                        <li>Integrations</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Resources</h4>
                    <ul>
                        <li>Product docs</li>
                        <li>Developer docs</li>
                        <li>Blog</li>
                        <li>Videos</li>
                        <li>Newsletter</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Contact and support</li>
                        <li>Terms of service</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-logo">DOCBOOK</div>
                <div className="footer-social">
                    <a href="#">GitHub</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">YouTube</a>
                </div>
                <div className="footer-copyright">
                    © 2024 COPYRIGHT DOCBOOK  ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
