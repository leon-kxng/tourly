import React, { useState } from "react";

const HeaderTop = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="header" data-header>
      <div
        className="overlay"
        data-overlay
        style={{ display: navOpen ? "block" : "none" }}
        onClick={() => setNavOpen(false)}
      ></div>
      <div className="header-top">
        <div className="container">
          <a href="tel:+01123456790" className="helpline-box">
            <div className="icon-box">
              <ion-icon name="call-outline"></ion-icon>
            </div>
            <div className="wrapper">
              <p className="helpline-title">For Further Inquires :</p>
              <p className="helpline-number">+01 (123) 4567 90</p>
            </div>
          </a>
          <a href="#" className="logo">
            <img src="/assets/images/logo.svg" alt="Tourly logo" />
          </a>
          <div className="header-btn-group">
            <button
              className="nav-open-btn"
              aria-label="Open Menu"
              data-nav-open-btn
              onClick={() => setNavOpen(true)}
            >
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      {/* Hamburger menu nav only on small screens */}
      <nav
        className={`navbar${navOpen ? " active" : ""}`}
        data-navbar
        style={{
          display: navOpen ? "block" : "none",
        }}
      >
        <div className="navbar-top">
          <a href="#" className="logo">
            {/* Use the blue logo here */}
            <img src="/assets/images/logo-blue.svg" alt="Tourly logo" />
          </a>
          <button
            className="nav-close-btn"
            aria-label="Close Menu"
            data-nav-close-btn
            onClick={() => setNavOpen(false)}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        {/* Menu links inside hamburger menu */}
        <ul className="navbar-list">
          <li>
            <a href="#home" className="navbar-link" data-nav-link>
              home
            </a>
          </li>
          <li>
            <a href="#" className="navbar-link" data-nav-link>
              about us
            </a>
          </li>
          <li>
            <a href="#destination" className="navbar-link" data-nav-link>
              destination
            </a>
          </li>
          <li>
            <a href="#package" className="navbar-link" data-nav-link>
              packages
            </a>
          </li>
          <li>
            <a href="#gallery" className="navbar-link" data-nav-link>
              gallery
            </a>
          </li>
          <li>
            <a href="#contact" className="navbar-link" data-nav-link>
              contact us
            </a>
          </li>
        </ul>
      </nav>
      <style>
        {`
          @media (min-width: 992px) {
            .navbar,
            .nav-open-btn,
            .nav-close-btn {
              display: none !important;
            }
          }
        `}
      </style>
    </header>
  );
};

export default HeaderTop;