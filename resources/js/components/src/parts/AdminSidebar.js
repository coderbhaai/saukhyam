import React, { Component } from 'react'
const func = require('./functions')

export class AdminSidebar extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            active:                     '',
            role:                       '',
            dept:                       []
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" ){ 
            this.setState({ role: JSON.parse(localStorage.getItem('user')).role || '' })
        }
        this.setState({ active: window.location.pathname })
        if(window.location.pathname === "/admin"){ this.setState({ active: "/adminUsers" }) }
        if(window.location.pathname === "/addProduct"){ this.setState({ active: "/adminProducts" }) }
    }
   
    render() {
        return (
            <div className="col-sm-2 sidebar">                                
                <ul>
                    {this.state.role==='Admin'?
                        func.adminLinks.map((i, index)=>( <li key={index}><a href={i.url} className={i.url == this.state.active? 'active' : null}>{i.text}</a></li> ))
                    : null}
                </ul>
            </div>
        )
    }
}

export default AdminSidebar
