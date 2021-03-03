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
        this.setState({ active: window.location.pathname })  
    }
   
    render() {
        const admin =[
            {text: 'Users', url: '/admin-users', active: '/admin-users'},
            {text: 'A & G', url: '/admin-attendance', active: '/admin-attendance'},
            // {text: 'Basics', url: '/admin-basics', active: '/admin-basics'},
        ]
        return (
            <div className="col-sm-2 sidebar">                                
                <ul>
                    {this.state.role==='Admin' || this.state.role==='Supervisor'?
                        admin.map((i, index)=>( <li key={index}><a href={i.url} className={i.url == this.state.active? 'active' : null}>{i.text}</a></li> ))
                    : null}
                    {this.state.role==='Admin'? 
                        <li><a href='/admin-basics' className={'/admin-basics' == this.state.active? 'active' : null}>Basics</a></li>
                    : null }
                </ul>
            </div>
        )
    }
}

export default AdminSidebar
