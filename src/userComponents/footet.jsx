import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="">
            <footer
                className="text-center text-lg-start text-white bg-secondary-subtle"
                
            >
                <div className="container p-4 pb-0">
                    <hr className="my-3" />
                    <section className="p-3 pt-0">
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <div className="text-center text-md-start">
                                <div className="p-3">
                                    © 2025 Copyright:
                                    <Link to="/" className="text-white ms-1">
                                        Trading Stars Academy
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center text-md-end">
                                <Link
                                    className="btn btn-outline-light btn-floating m-1 text-white"
                                    role="button"
                                    to="#"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                                <Link
                                    className="btn btn-outline-light btn-floating m-1 text-white"
                                    role="button"
                                    to="#"
                                >
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link
                                    className="btn btn-outline-light btn-floating m-1 text-white"
                                    role="button"
                                    to="#"
                                >
                                    <i className="fab fa-google"></i>
                                </Link>
                                <Link
                                    className="btn btn-outline-light btn-floating m-1 text-white"
                                    role="button"
                                    to="#"
                                >
                                    <i className="fab fa-instagram"></i>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
