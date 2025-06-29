import React, { useEffect, useState } from "react";
import { fetchPackages } from "./api/pocketbase";
import { Link } from "react-router-dom";
import "./AllPackages.css"; // Reuse the same styles as AllPackages

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchPackages()
      .then((data) => {
        if (isMounted) setPackages(data);
      })
      .catch((err) => {
        if (!err.message || !err.message.includes("autocancelled")) {
          if (isMounted) setError(err.message || "Error fetching packages");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>Error fetching packages: {error}</p>;

  return (
    <section className="package" id="package">
      <div className="container">
        <p className="section-subtitle">Popular Packages</p>
        <h2 className="h2 section-title">Checkout Our Packages</h2>
        <p className="section-text">
          Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
          Sit ornare mollitia tenetur, aptent.
        </p>
        <div className="all-packages-grid">
          {packages.slice(0, 4).map((pkg) => {
            const imageFile = pkg.image && (Array.isArray(pkg.image) ? pkg.image[0] : pkg.image);
            const imageUrl = imageFile
              ? `https://backend-tourly.fly.dev/api/files/packages/${pkg.id}/${imageFile}`
              : "./assets/images/packege-1.jpg";
            const reviews = pkg.reviews || 0;
            const stars = 5;

            return (
              <div className="package-card" key={pkg.id}>
                <figure className="card-banner">
                  <img
                    src={imageUrl}
                    alt={pkg.title}
                    loading="lazy"
                  />
                </figure>
                <div className="card-content">
                  <h3 className="h3 card-title">{pkg.title}</h3>
                  <p className="card-text">
                    {pkg.description && pkg.description.length > 100
                      ? pkg.description.slice(0, 100) + "..."
                      : pkg.description}
                  </p>
                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="time"></ion-icon>
                        <p className="text">{pkg.duration}</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="people"></ion-icon>
                        <p className="text">pax: {pkg.pax}</p>
                      </div>
                    </li>
                    <li className="card-meta-item">
                      <div className="meta-box">
                        <ion-icon name="location"></ion-icon>
                        <p className="text">{pkg.location}</p>
                      </div>
                    </li>
                  </ul>
                  <div className="card-price">
                    <div className="wrapper">
                      <p className="reviews">({reviews} reviews)</p>
                      <div className="card-rating">
                        {[...Array(stars)].map((_, i) => (
                          <ion-icon key={i} name="star"></ion-icon>
                        ))}
                      </div>
                    </div>
                    <p className="price">
                      ${pkg.price}
                      <span>/ per person</span>
                    </p>
                    <Link
                      to={`/package/${pkg.id}`}
                      className="btn btn-secondary"
                      style={{ display: "inline-block", textDecoration: "none", color: "inherit" }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link to="/packages" className="btn btn-primary">
          View All Packages
        </Link>
      </div>
    </section>
  );
};

export default Packages;