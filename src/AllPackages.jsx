import React, { useEffect, useState } from "react";
import { fetchPackages } from "./api/pocketbase";
import { Link } from "react-router-dom";
import "./AllPackages.css"; // Optional: for custom styles

const AllPackages = () => {
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
    <section className="all-packages">
      <div className="container">
        <h2 className="h2 section-title">All Packages</h2>
        <div className="all-packages-grid">
          {packages.map((pkg) => {
            const imageFile = pkg.image && (Array.isArray(pkg.image) ? pkg.image[0] : pkg.image);
            const imageUrl = imageFile
              ? `https://backend-tourly.fly.dev/api/files/packages/${pkg.id}/${imageFile}`
              : "./assets/images/packege-1.jpg";
            return (
              <div className="package-card" key={pkg.id}>
                <figure className="card-banner">
                  <img src={imageUrl} alt={pkg.title} loading="lazy" />
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
                    <p className="price">
                      ${pkg.price}
                      <span>/ per person</span>
                    </p>
                    <Link to={`/package/${pkg.id}`} className="btn btn-secondary">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllPackages;