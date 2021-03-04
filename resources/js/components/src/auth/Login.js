import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import api from '../parts/api'
const func = require('../parts/functions')

class Login extends Component {
    constructor(props){
        super(props)        
        this.state = {
            // email:              '',
            // password:           '',
            email:              'test@test.com',
            password:           '123456789',
            auth:               false,
            clientId:                   '915022609455-q7nh558mli08jvgk691gksddalp6gk2k.apps.googleusercontent.com',
            clientSecret:               'fitq9oKd_98f20gOY9cWwoCe'            
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            this.setState({ auth: JSON.parse(localStorage.getItem('user')).auth || false })
        }
        const url = window.location.href.split("e=");
        if(url[1]){
            localStorage.removeItem('user')
            this.setState({ auth: false })
            window.location.href = func.base+'login'
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    submitHandler = e =>{
        e.preventDefault()
        const data={
            email:                      this.state.email,
            password:                   this.state.password,
        }               
        axios.post(api.login, data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    localStorage.setItem('message', res.data.message)
                    window.location.href = func.base
                }else{ func.callSwal(res.data.message) }
            })
            .catch(err=>func.printError(err))
    }

    gofbLogin = (res, type) =>{
        if(type=='Google'){
            var data = {
                email: res.profileObj.email,
                password: res.googleId,
            };
        }else if(type=='FB'){
            var data = {
                email: res.email,
                password: res.userID,
            };
        }
        axios.post(api.login, data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    localStorage.setItem('message', res.data.message)
                    window.location.href = func.base
                }else{ func.callSwal(res.data.message) }
            })
            .catch(err=>{ func.printError(err) })
    }

    render() {
        if(this.state.auth){ window.location.href = func.base }
        const loginGoogle = (res) => { this.gofbLogin(res, 'Google'); }
        const loginFB = (res) => { this.gofbLogin(res, 'FB'); }

        return (
            <section className="auth">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>Login</h2>
                            <form onSubmit={this.submitHandler}>
                                <label>Email</label>
                                <input type="text" placeholder="Enter email" name="email" id="email" required onChange={this.onChange} value={this.state.email}/>
                                <label>Password</label>
                                <input type="password" placeholder="Enter password" name="password" id="password" required onChange={this.onChange} value={this.state.password} />
                                <button type="submit" className="amitBtn">Login</button>
                                <div className="text-center"><a href={func.base+"forgotPassword"}>Forgot password</a></div>
                            </form>
                            <div className="gofb">
                                <GoogleLogin clientId={this.state.clientId} buttonText="Login with Google" onSuccess={loginGoogle} onFailure={loginGoogle} ></GoogleLogin>
                                <FacebookLogin appId="476215263560097" autoLoad={false} fields="name,email,picture" callback={loginFB}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Login