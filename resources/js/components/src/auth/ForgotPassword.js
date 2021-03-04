import React, { Component } from 'react'
import axios from 'axios'
const func = require('../parts/functions')
import api from '../parts/api'

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:             'amit.khare588@gmail.com',
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }
    
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    
    ResetPassword = e =>{
        e.preventDefault()
        const data={
            email:                      this.state.email
        }
        axios.post(api.forgotPassword, data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('message', res.data.message)
                    window.location.href = func.base
                }else{
                    func.callSwal(res.data.message)
                }
            })
            .catch(err=>{ func.printError(err) })
    }

    render() {
        return (
            <section className="auth">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <h1 className="heading">Forgot Password?</h1>
                            <form onSubmit={this.ResetPassword}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label>E-Mail Address</label>
                                        <input type="email" className="form-control" name="email" required placeholder="Email Please" value={this.state.email} onChange={this.onChange}/>
                                    </div>
                                    <button className="amitBtn" type="submit">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default ForgotPassword