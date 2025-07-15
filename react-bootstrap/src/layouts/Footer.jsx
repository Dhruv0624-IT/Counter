import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light py-5 ">
      <div className="row gy-4">
        {/* Contact Us */}
        <div className="col-12 col-sm-6 col-md-6 col-lg-3 ps-lg-5 ">
          <h5 className="text-uppercase py-3">Contact Us</h5>
          <hr className="text-danger w-25" />
          <ul className="list-unstyled ps-2">
            <li><i className="fa-solid fa-location-dot"></i> <a href="/">Our Branches</a></li>
            {["A K Road", "Yogi Chowk", "Sarthana", "Mota Varachha", "Ved Road", "Adajan", "Dindoli", "Vesu"].map((branch, i) => (
              <li key={i}>
                <i className="fa-solid fa-play text-danger me-2" style={{ fontSize: ".6rem" }}></i>
                <a href="/" style={{ textDecoration: "none" }}>{branch}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Trending Courses */}
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <h5 className="text-uppercase py-3">Trending Courses</h5>
          <hr className="text-danger w-25" />
          <ul className="list-unstyled">
            {["PHP", "Project Training Surat", "Android Training Course", "Web Designing Training Course", "Full Stack Development Course"].map((course, i) => (
              <li key={i}>
                <i className="fa-solid fa-play text-danger me-2" style={{ fontSize: ".6rem" }}></i>
                <a href="/" style={{ textDecoration: "none" }}>{course}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Pages */}
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <h5 className="text-uppercase py-3">Important Pages</h5>
          <hr className="text-danger w-25" />
          <ul className="list-unstyled">
            {["Home", "Contact Us", "About Us", "Blog", "Events", "Approval", "Student T&C", "Sitemap", "Cities Sitemap", "Student Login"].map((page, i) => (
              <li key={i}>
                <i className="fa-solid fa-play text-danger me-2" style={{ fontSize: ".6rem" }}></i>
                <a href="/" style={{ textDecoration: "none" }}>{page}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Be Recruiter */}
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <h5 className="text-uppercase py-3">Be Recruiter</h5>
          <hr className="text-danger w-25" />
          <ul className="list-unstyled">
            <li><i className="far fa-address-card me-2" style={{ fontSize: ".6rem" }}></i><a href="/">Company Login/Register</a></li>
            <li><i className="far fa-handshake me-2" style={{ fontSize: ".6rem" }}></i><a href="/">Company T&C</a></li>
            <li><i className="far fa-address-card me-2" style={{ fontSize: ".6rem" }}></i><a href="/">Placement Student Login</a></li>
            <li><i className="far fa-handshake me-2" style={{ fontSize: ".6rem" }}></i><a href="/">Placement Student T&C</a></li>
            <li><i className="fas fa-phone-alt me-2" style={{ fontSize: ".6rem" }}></i><a href="/">+91 93313 13196</a></li>
            <li><i className="far fa-envelope me-2" style={{ fontSize: ".6rem" }}></i><a href="/">placement@rnwmultimedia.edu.in</a></li>
          </ul>

          {/* Government Logos */}
          <div className="d-flex gap-2 py-3 mt-3 flex-wrap">
            <img src="public/beti-bachao-beti-padhao-min.png" alt="Beti Bachao" className="img-fluid" style={{ maxHeight: "40px" }} />
            <img src="public/digital-india-min.png" alt="Digital India" className="img-fluid" style={{ maxHeight: "40px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;