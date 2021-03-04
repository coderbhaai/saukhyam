import React, { Component } from 'react'
const func = require('./functions')

export default function(ComposedComponent){
    class RequireAdmin extends Component {        
        componentDidMount(){
            if(typeof(Storage) !== "undefined" && localStorage.getItem('user') ){
                if( JSON.parse(localStorage.getItem('user')).role === "Admin" ){
                }else{
                    this.props.history.push(func.base+"login")
                }
            }else{
                this.props.history.push(func.base+"login") 
            }
        }
        render() { return ( <ComposedComponent {...this.props}/> ) }
    }
    return RequireAdmin
}