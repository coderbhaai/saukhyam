import React, { Component } from 'react'
const func = require('./functions')

export class Footer extends Component {
    render() {
        return (
            <>
                <section className="footer">
                    <div className="container">
                        <div className="featured">
                            <h2>Saukhyam Pads is proud to be featured in</h2>
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src={func.base+"/images/icons/featured_logo_06.png"}/>
                                    <img src={func.base+"/images/icons/featured_logo_05.png"}/>
                                </div>
                                <div className="col-sm-3">
                                    <img src={func.base+"/images/icons/featured_logo_02.png"}/>
                                    <img src={func.base+"/images/icons/featured_logo_01.png"}/>
                                </div>
                                <div className="col-sm-3">
                                    <img src={func.base+"/images/icons/featured_logo_07.png"}/>
                                    <img src={func.base+"/images/icons/featured_logo_03.png"}/>
                                </div>
                                <div className="col-sm-3">
                                    <img src={func.base+"/images/icons/featured_logo_04.png"}/>
                                    <img src={func.base+"/images/icons/featured_logo_08.png"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-3 mathLogo">
                                <img src={func.base+"/images/footer_logo.png"}/>
                            </div>
                            <div className="col-sm-3">
                                <p>Saukhyam began as a research project at Amrita University. Ranked as the 4th best university in India (NIRF 2020), Amrita emphasizes research that benefits society.</p>
                                <h3 className="mt-3">Follow Us</h3>
                                <div className="middle">
                                    <a target="_blank" href="https://www.facebook.com/SaukhyamReusablePads/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                    {/* <a target="_blank" href="https://www.linkedin.com/in/amitkhare588/"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                    <a target="_blank" href="https://twitter.com/AmitdoubleK"><i className="fa fa-twitter" aria-hidden="true"></i></a> */}
                                    <a target="_blank" href="https://www.youtube.com/channel/UCP_eM9o-i-HWixf-OB5lHpg"><i className="fa fa-youtube" aria-hidden="true"></i></a>
                                    <a target="_blank" href="https://www.instagram.com/saukhyam_pads/"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                    <a target="_blank" href="https://api.whatsapp.com/send/?phone=919497343225&amp;text&amp;app_absent=0"><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
                                </div>  
                            </div>
                            <div className="col-sm-6">
                                <h3 className="mt-3">Contact Us</h3>                              
                                <ul className="emailPhone">
                                    <li><a href="mailto:info@saukhyampads.org"><i className="fa fa-envelope" aria-hidden="true"></i> info@saukhyampads.org</a></li>
                                    <li><a href="tel:+91 6282 103 073"><i className="fa fa-phone" aria-hidden="true"></i> +91 6282 103 073</a></li>
                                </ul>
                                <div className="links">
                                    <ul>
                                        <li><a target="_blank" href="http://amma.org">amma.org</a></li>
                                        <li><a target="_blank" href="http://amritapuri.org">amritapuri.org</a></li>
                                        <li><a target="_blank" href="http://amritaworld.org">amritaworld.org</a></li>
                                        <li><a target="_blank" href="http://matruvani.org">matruvani.org</a></li>
                                    </ul>
                                    <ul>
                                        <li><a target="_blank" href="http://amrita.edu">amrita.edu</a></li>
                                        <li><a target="_blank" href="http://amritavidyalayam.org">amritavidyalayam.org</a></li>
                                        <li><a target="_blank" href="http://amritayoga.com">amritayoga.com</a></li>
                                        <li><a target="_blank" href="http://iam-meditation.org">iam-meditation.org</a></li>
                                    </ul>
                                    <ul>
                                        <li><a target="_blank" href="http://amritaserve.org">amritaserve.org</a></li>
                                        <li><a target="_blank" href="http://theammashop.org">theammashop.org</a></li>
                                        <li><a target="_blank" href="http://amritastore.com">amritastore.com</a></li>
                                        <li><a target="_blank" href="http://embracingtheworld.org">embracingtheworld.org</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer-bottom">
                    <div className="bottom-content">
                        <p>© 2020</p>
                        <p>Powered by : <a href="https://www.amitkk.com" target="_blank">AmitKK</a></p>
                    </div>
                </section>
            </>
        )
    }
}

export default Footer
