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
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    fetchPackages()
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setPkg(found);
        setCurrentImg(0);
      })
      .catch((err) => setError(err.message || "Error fetching package"));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!pkg) return <p>Loading...</p>;

  // Get all images for the package
  const images = Array.isArray(pkg.image) ? pkg.image : pkg.image ? [pkg.image] : [];
  const imageUrls = images.map(
    (img) => `https://backend-tourly.fly.dev/api/files/packages/${pkg.id}/${img}`
  );

  const handlePrev = () => setCurrentImg((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  const handleNext = () => setCurrentImg((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));

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
            {/* Carousel */}
            {imageUrls.length > 0 && (
              <div className="carousel" style={{ position: "relative", marginBottom: "1rem", textAlign: "center" }}>
                <img
                  src={imageUrls[currentImg]}
                  alt={pkg.title}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                {imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                      }}
                      aria-label="Previous image"
                    >
                      &#8592;
                    </button>
                    <button
                      onClick={handleNext}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                      }}
                      aria-label="Next image"
                    >
                      &#8594;
                    </button>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#888" }}>
                      {currentImg + 1} / {imageUrls.length}
                    </div>
                  </>
                )}
              </div>
            )}
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
            {/* Description with paragraphs */}
            {pkg.description &&
              pkg.description.split(/\r?\n/).map((para, idx) =>
                para.trim() ? (
                  <p className="card-text" key={idx}>{para}</p>
                ) : null
              )
            }
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

