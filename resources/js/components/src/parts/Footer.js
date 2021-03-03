import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <>
                <section className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="footer-content">
                                    <h3>About</h3>
                                    <div className="underline"></div>
                                    <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="footer-content">
                                    <h3>Products</h3>
                                    <div className="underline"></div>
                                    <ul>
                                        <li><a href="#">Mobiles</a></li>
                                        <li><a href="#">Shirts</a></li>
                                        <li><a href="#">Jeans</a></li>
                                        <li><a href="#">Accessories</a></li>
                                        <li><a href="#">Computer</a></li>
                                        <li><a href="#">Home appliances</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="footer-content">
                                    <h3>Useful links</h3>
                                    <div className="underline"></div>
                                    <ul>
                                        <li><a href="#">Your account</a></li>
                                        <li><a href="#">Shipping rates</a></li>
                                        <li><a href="#">Terms and conditions</a></li>
                                        <li><a href="#">Privacy policy</a></li>
                                        <li><a href="#">Products and services</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="footer-content">
                                    <h3>Contact us</h3>
                                    <div className="underline"></div>
                                    <ul>
                                        <li><i className="fa fa-home"></i>New York, Avenue Street 10</li>
                                        <li><i className="fa fa-phone"></i>042 876 836 908</li>
                                        <li><i className="fa fa-envelope-o"></i>company@example.com</li>
                                        <li><i className="fa fa-clock"></i>Monday - Friday: 10a.m-08p.m</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer-bottom">
                    <div className="bottom-content">
                        <p>© 2020 Copyright: www.website.com</p>
                    </div>
                </section>
            </>
        )
    }
}

export default Footer
