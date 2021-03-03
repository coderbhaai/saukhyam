import React, { Component } from 'react'

export default function(ComposedComponent){
    class RequireAdmin extends Component {        
        componentDidMount(){
            if(typeof(Storage) !== "undefined" && localStorage.getItem('user') ){ 
                console.log("Welcome", JSON.parse(localStorage.getItem('user')).role )
                if( JSON.parse(localStorage.getItem('user')).role === "Admin" ){
                }else{
                    this.props.history.push('/login')
                }
            }else{
                this.props.history.push('/login')
            }
        }
        render() { return ( <ComposedComponent {...this.props}/> ) }
    }
    return RequireAdmin
}