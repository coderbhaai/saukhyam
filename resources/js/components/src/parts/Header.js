import React, { Component } from 'react'
import api from './api'
const func = require('./functions')

export class Header extends Component {
    constructor(props) {
        super(props)    
        this.state = {
             user:                      []
        }
    }

    componentDidMount(){
        if(typeof(Storage) !== "undefined" && localStorage.getItem('message') ){
            swal({ title: localStorage.getItem('message'), timer: 4000  })
            setTimeout(function() { localStorage.removeItem('message') }, 4000)
        }
        if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
    }    

    toSentenceCase=(str)=>{ return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() } ) }

    logout = (e) =>{
        e.preventDefault()
        const data={
            email: this.state.user.email,
            id: this.state.user.id
        }
        const token = JSON.parse(localStorage.getItem('user')).token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.logout, data)
            .then(res=> {
                if(res.data.success){
                    localStorage.clear();
                    this.setState({ user: [] })
                    localStorage.setItem('message', res.data.message)
                    window.location.href = func.base+'login'
                }
            })
            .catch(err=>func.printError(err))
    }


    render() {
        return (
            <nav className={"navbar navbar-expand-lg sticky-top"}>
                <a className="logo" href={func.base}>
                    <img className="greenLogo" src={func.base+"images/logo.png"}/>
                    <img className="whiteLogo" src={func.base+"images/logo-1.png"}/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item"><a className="nav-link" href={func.base}>Home <span className="sr-only">(current)</span></a></li>
                        {this.state.user.role?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.user.name}</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href={func.base+"admin"}>Admin Panel</a>
                                    <button className="dropdown-item" onClick={this.logout}>Log Out</button>
                                </div>
                            </li>
                        : 
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span><i className="fa fa-user" aria-hidden="true"></i></span></a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href={func.base+"register"}>Sign Up</a>
                                    <a className="dropdown-item" href={func.base+"login"}>Sign In</a>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header
