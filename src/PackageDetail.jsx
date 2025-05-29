import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPackages } from "./api/pocketbase";
import HeaderTop from "./HeaderTop.jsx";
import Footer from "./Footer.jsx";
import "./PackageDetail.css";
import heroBanner from "./assets/images/hero-banner.jpg";

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages()
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setPkg(found);
      })
      .catch((err) => setError(err.message || "Error fetching package"));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!pkg) return <p>Loading...</p>;

  const imageFile = pkg.image && (Array.isArray(pkg.image) ? pkg.image[0] : pkg.image);
  const imageUrl = imageFile
    ? `https://backend-tourly.fly.dev/api/files/packages/${pkg.id}/${imageFile}`
    : "./assets/images/packege-1.jpg";

  return (
    <>
      <HeaderTop />
      <div
        className="package-detail"
        style={{
          background: `url(${heroBanner}) center center/cover no-repeat`,
          padding: "40px 0",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div className="package-detail-overlay"></div>
        <div className="container" style={{ position: "relative", zIndex: 1, marginTop: "100px" }}>
          <div className="package-card">
            <Link to="/" className="back-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
            <h2 className="h2 card-title">{pkg.title}</h2>
            <figure className="card-banner">
              <img
                src={imageUrl}
                alt={pkg.title}
              />
            </figure>
            <ul className="card-meta-list">
              <li className="card-meta-item">
                <div className="meta-box">
                  <ion-icon name="time"></ion-icon>
                  <span className="text">{pkg.duration}</span>
                </div>
              </li>
              <li className="card-meta-item">
                <div className="meta-box">
                  <ion-icon name="people"></ion-icon>
                  <span className="text">pax: {pkg.pax}</span>
                </div>
              </li>
              <li className="card-meta-item">
                <div className="meta-box">
                  <ion-icon name="location"></ion-icon>
                  <span className="text">{pkg.location}</span>
                </div>
              </li>
              <li className="card-meta-item">
                <div className="meta-box">
                  <ion-icon name="star"></ion-icon>
                  <span className="text">{pkg.reviews || 0} reviews</span>
                </div>
              </li>
            </ul>
            <p className="card-text">{pkg.description}</p>
            <div className="card-price">
              <p className="price">
                ${pkg.price}
                <span>/ per person</span>
              </p>
              <button className="btn btn-secondary">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PackageDetail;

