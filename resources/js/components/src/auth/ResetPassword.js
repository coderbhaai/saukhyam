import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
const func = require('../parts/functions')
import api from '../parts/api'

class ResetPassword extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            token:                  '',
            email:                  '',
            password:               '',
            confirm_password:       ''
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    submitHandler = (e) =>{
        e.preventDefault()
        const data={
            token:                      window.location.href.split("/").pop(),
            email:                      this.state.email,
            password:                   this.state.password,
            confirm_password:           this.state.confirm_password
        }
        axios.post(api.resetPassword, data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('message', res.data.message)
                    window.location.href = func.base+"login"
                }else{
                    this.callSwal(res.data.message)
                }
            })
            .catch(err=>{ func.printError(err) })
    }

    render() {
        return (
            <section className="register authTwo">
                <div className="topRow">
                    <img src="/images/static/banana.png" className="banana"/>
                    <a href="/"><img src="/images/logo2.png" className="logo"/></a>
                </div>
                <div className="container-fluid mainBody">
                    <div className="row">
                        <div className="col-sm-6 offset-3">
                            <p>We are on a mission to make reusables mainstream and disposables known as the old fashioned choice that they really are.</p>
                            <div className="authBox">
                                <form onSubmit={this.submitHandler}>
                                    <label>E-Mail Address</label>
                                    <input id="emailRegister" type="email" className="form-control" name="email" required autoComplete="email" value={this.state.email} onChange={this.onChange}/>
                                    <label>Password</label>
                                    <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password" value={this.state.password} onChange={this.onChange}/>
                                    <label>Confirm Password</label>
                                    <input id="password-confirm" type="password" className="form-control" name="confirm_password" required autoComplete="new-password" value={this.state.confirm_password} onChange={this.onChange}/>
                                    <div className="text-center mt-3"><button type="submit" className="amitBtnRound">Reset Password</button></div>
                                </form>
                                <div className="text-center"><a href={func.base}>Login</a></div>
                            </div>                                   
                            <p>Inviting enterprising and resourceful women and men to join our</p>
                            <h3>AFFILIATE VIJAYA PROGRAM</h3>
                            <div className="gstore">
                                <p>Get App from Google Play Store</p>
                                <div className="text-center store"><a href="" className="amitBtnRound"><img src="/images/icons/playstore.svg"/> DOWNLOAD </a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="/images/static/cotton.png" className="cotton"/>
            </section>
        )
    }
}
export default ResetPassword