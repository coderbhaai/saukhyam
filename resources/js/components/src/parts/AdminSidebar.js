import React, { Component } from 'react'
const func = require('../parts/functions')

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
        if(window.location.pathname === func.base+"admin"){ this.setState({ active: func.base+"adminUsers" }) }
        this.setState({ active: window.location.pathname })  
    }
   
    render() {
        const admin =[
            {text: 'Users', url: func.base+"adminUsers", active: func.base+"adminUsers"},
        ]
        return (
            <div className="col-sm-2 sidebar">                                
                <ul>
                    {this.state.role==='Admin'?
                        admin.map((i, index)=>( <li key={index}><a href={i.url} className={i.url == this.state.active? 'active' : null}>{i.text}</a></li> ))
                    : null}
                </ul>
            </div>
        )
    }
}

export default AdminSidebar
