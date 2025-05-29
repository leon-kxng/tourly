import React from "react";
import Packages from "./packages.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Home = () => (
  <>
    <Header />
    {/* MAIN */}
    <main>
      <article>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="container">
            <h2 className="h1 hero-title">Journey to explore world</h2>
            <p className="hero-text">
              Ac mi duis mollis. Sapiente? Scelerisque quae, penatibus? Suscipit class corporis nostra rem quos voluptatibus habitant?
              Fames, vivamus minim nemo enim, gravida lobortis quasi, eum.
            </p>
            <div className="btn-group">
              <button className="btn btn-primary">Learn more</button>
              <button className="btn btn-secondary">Book now</button>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <Packages />

        {/* GALLERY */}
        <section className="gallery" id="gallery">
          <div className="container">
            <p className="section-subtitle">Photo Gallery</p>
            <h2 className="h2 section-title">Photo's From Travellers</h2>
            <p className="section-text">
              Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
              Sit ornare mollitia tenetur, aptent.
            </p>
            <ul className="gallery-list">
              <li className="gallery-item">
                <figure className="gallery-image">
                  <img src="./assets/images/gallery-1.jpg" alt="Gallery image" />
                </figure>
              </li>
              <li className="gallery-item">
                <figure className="gallery-image">
                  <img src="./assets/images/gallery-2.jpg" alt="Gallery image" />
                </figure>
              </li>
              <li className="gallery-item">
                <figure className="gallery-image">
                  <img src="./assets/images/gallery-3.jpg" alt="Gallery image" />
                </figure>
              </li>
              <li className="gallery-item">
                <figure className="gallery-image">
                  <img src="./assets/images/gallery-4.jpg" alt="Gallery image" />
                </figure>
              </li>
              <li className="gallery-item">
                <figure className="gallery-image">
                  <img src="./assets/images/gallery-5.jpg" alt="Gallery image" />
                </figure>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </main>
    <Footer />

    {/* GO TO TOP */}
    <a href="#top" className="go-top" data-go-top>
      <ion-icon name="chevron-up-outline"></ion-icon>
    </a>
  </>
);

export default Home;