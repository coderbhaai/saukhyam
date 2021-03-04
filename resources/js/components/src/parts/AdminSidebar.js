import React, { Component } from 'react'

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
        if(window.location.pathname === '/admin'){ this.setState({ active: '/adminUsers' }) }
        // if(window.location.pathname.split("/")[1] === 'admin-updateEvent'){ this.setState({ active: '/admin-events' }) }

        this.setState({ active: window.location.pathname })  
    }
   
    render() {
        const admin =[
            {text: 'Users', url: '/adminUsers', active: '/adminUsers'},
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
