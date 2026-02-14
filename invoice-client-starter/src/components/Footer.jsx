import React from "react";

const Footer = () => {
    return (
        <footer className="bg-light text-center text-muted py-3 border-top">
            <div className="container">
                <ul className="nav justify-content-center mb-2">
                    <li className="nav-item">
                        <span className="nav-link px-2 text-muted">Osoby</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link px-2 text-muted">Faktury</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link px-2 text-muted">Statistiky</span>
                    </li>
                </ul>
                <small>
                    © {new Date().getFullYear()} Fakturační aplikace – Václav Pém
                </small>
            </div>
        </footer>
    );
};

export default Footer;
