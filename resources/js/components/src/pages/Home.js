import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
const func = require('../parts/functions')

export class Home extends Component {
    render() {
        return (
            <>
                <section className="home-banner">
                    <Swiper {...func.params}>
                        {func.banner.map((i,index)=>(
                            <div className="banner" key={index}>
                                <img src={func.base+"images/"+i.img}/>
                            </div>
                        ))}
                    </Swiper>
                </section>
                <section className="who mt-5">
                    <div className="container">
                        <h2>Who we are</h2>
                        <div className="row">
                            <div className="col-sm-4">
                                <img src={func.base+"images/who.jpg"} alt="" />
                            </div>
                            <div className="col-sm-8">
                                <p>If you're considering a new laptop, looking for a powerful new car stereo or shopping for a new HDTV, we make it easy to find exactly what you need at a price you can afford. We offer Every Day Low Prices on TVs, laptops, cell phones, tablets and iPads, video games, desktop computers, cameras and camcorders, audio, video and more.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="our-vendors my-5">
                    <div className="container testimony">
                        <div className="row">
                            <div className="col-sm-12 navOnTop">
                                <h2>Our vendors</h2>
                                <Swiper {...func.params2}>
                                    {func.testimony.map((i,index)=>(
                                        <div key={index}>
                                            <img className="vendors-img" src={func.base+"images/static/"+i.img}/>
                                            <div>
                                                <i className="fa fa-quote-left" aria-hidden="true"></i>
                                                <p className="text">{i.text}</p>
                                                <i className="fa fa-quote-right" aria-hidden="true"></i>
                                                <h5 className="title">{i.title}</h5>
                                            </div>
                                        </div>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="our-products">
                    <div className="container">
                        <h2>Our products</h2>
                        <div className="row">
                            {func.products.map((i,index)=>(
                                <div className="col-sm-4" key={index}>
                                    <div className="card imgScale">
                                        <img src={func.base+"images/crap/"+i.img}/>
                                        <div className="card-body">
                                            <h4>{i.title}</h4>
                                            <ul>
                                                <li>&#8377;{i.price}</li>
                                                <li>VIEW DETAILS</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Home