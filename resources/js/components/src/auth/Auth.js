import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
const func = require('../parts/functions')
import api from '../parts/api'
const secret = require('../parts/secret')

export class Auth extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            auth:                       false,
            name :                      '',
            email :                     '',
            phone :                     '',
            role :                      'User',
            password :                  '', 
            provider:                   'Email',
            refrence:                   null,
            image:                      '',
            active:                     'Login',
            clientId:                   secret.clientId,
            clientSecret:               secret.clientSecret,
            appId:                      secret.fbAppId
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            if(JSON.parse(localStorage.getItem('user')).role){
                this.setState({ auth: true })
            }
        }
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){
            console.log('0')
            if(JSON.parse(localStorage.getItem('user')).role=='Admin' || JSON.parse(localStorage.getItem('user')).role=='Manager' || JSON.parse(localStorage.getItem('user')).role=='SuperAdmin'){ 
                console.log('2')
                window.location.href = '/admin'
            }else{
                console.log('3')
            }
        }else{
            console.log('1')
        }

        const url = window.location.href.split("/").pop();
        if(url && url!== 'register'){ 
            localStorage.setItem('refrence', url)
            this.setState({ refrence: url })
        }
        if(typeof(Storage) !== "undefined" && localStorage.getItem('refrence')){ 
            this.setState({ refrence: localStorage.getItem('refrence') || null })
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    
    regsiterHandler = (e) => {
        e.preventDefault()
        if(this.state.phone.length<10){
            func.callSwal("Phone Should be 10 digit")
        }else{
            const data={
                name:                       this.state.name, 
                email:                      this.state.email,
                role:                       this.state.role,
                phone:                      this.state.phone,
                refrence:                   this.state.refrence,
                password:                   this.state.password,
                password_confirmation:      this.state.password_confirmation,
                provider:                   this.state.provider,
            }
            axios.post(api.register, data)
            .then( res=>{
                func.callSwal(res.data.message)
                if(res.data.success){
                    this.setState({ 
                        active:                     'Login',
                        name :                      '',
                        email :                     '',
                        phone :                     '',
                        password :                  '',
                    })
                }
            })
            .catch(err=>func.printError(err))
        }
    }

    gofbRegisteration(res, type) {
        console.log(`res`, res)
        if(type=='Google'){
            var data = {
                name:                   res.profileObj.name,
                email:                  res.profileObj.email,
                password:               res.googleId,
                image:                  res.profileObj.imageUrl,
                provider:               'Google',
                role:                   this.state.role,
                refrence:               this.state.refrence,
            };
        }else if(type=='FB'){
            var data = {
                name:                   res.name,
                email:                  res.email,
                password:               res.userID,
                image:                  res.picture.data.url,
                provider:               'FB',
                role:                   this.state.role,
                refrence:               this.state.refrence,
            };
        }
        axios.post('/api/register', data)
            .then( res=>{
                func.callSwal(res.data.message)
            })
            .catch(err=>{ func.printError(err) })
    };

    changeActive=(val)=>{ this.setState({ active: val }) }

    loginHandler = (e) =>{
        e.preventDefault()
        if(typeof(Storage) !== "undefined" && localStorage.getItem('auth')){ 
            func.callSwal("You are already logged in.")
        }else{
            const data={
                email:                      this.state.email,
                password:                   this.state.password,
            }               
            axios.post(api.login, data)
                .then(res=> {
                    func.callSwal(res.data.message)
                    if(res.data.success){
                        this.setState({ 
                            auth:                       true,
                            email :                     '',
                            password :                  '',
                        })
                        localStorage.setItem('user', JSON.stringify(res.data.data))
                        localStorage.setItem('auth', true)
                        localStorage.setItem('message', res.data.message)
                        if(res.data.data.role=='Admin' || res.data.data.role=='Manager' || res.data.data.role=='SuperAdmin'){ 
                            window.location.href = '/admin'
                        }
                    }
                })
                .catch(err=>func.printError(err))
        }
    }

    gofbLogin = (res, type) =>{
        if(typeof(Storage) !== "undefined" && localStorage.getItem('auth')){ 
            func.callSwal("You are already logged in.")
        }else{
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
                    func.callSwal(res.data.message)
                    if(res.data.success){
                        this.setState({ auth: true })
                        localStorage.setItem('user', JSON.stringify(res.data.data))
                        localStorage.setItem('auth', true)
                        localStorage.setItem('message', res.data.message)
                        if(res.data.data.role=='Admin' || res.data.data.role=='Manager' || res.data.data.role=='SuperAdmin'){ 
                            window.location.href = '/admin'
                        }
                    }
                })
                .catch(err=>{ func.printError(err) })
        }
    }

    logout = (e) =>{
        e.preventDefault()
        // const data={
        //     email: this.state.user.email,
        //     id: this.state.user.id
        // }
        const token = JSON.parse(localStorage.getItem('user')).token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.logout)
            .then(res=> {
                func.callSwal(res.data.message)
                if(res.data.success){
                    localStorage.clear();
                    this.setState({ user: [], auth: false, active: "Login" })
                }
            })
            .catch(err=>func.printError(err))
    }

    render() {
        const regGoogle = (res) => { this.gofbRegisteration(res, 'Google'); }
        const regFB = (res) => { this.gofbRegisteration(res, 'FB'); }
        const loginGoogle = (res) => { this.gofbLogin(res, 'Google'); }
        const loginFB = (res) => { this.gofbLogin(res, 'FB'); }
        return (
            <>
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
                                    <ul>
                                        <li onClick={()=>this.changeActive('Login')} className={this.state.active == "Login"? "active" : null}>Login</li>
                                        <li onClick={()=>this.changeActive('Register')} className={this.state.active == "Register"? "active" : null}>Sign Up</li>
                                        {this.state.auth ?<li onClick={()=>this.changeActive('logOut')} className={this.state.active == "logOut"? "active" : null}>Log Out</li> : null }
                                    </ul>
                                    {this.state.active=="Register"?
                                    <>
                                        <form onSubmit={this.regsiterHandler}>
                                            <div>
                                                <label>Name</label>
                                                <input type="text" name="name" value={this.state.name} onChange={this.onChange} required />
                                            </div>
                                            <div>
                                                <label>Email</label>
                                                <input type="text" name="email" value={this.state.email} onChange={this.onChange} required />
                                            </div>
                                            <div>
                                                <label>Phone</label>
                                                <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} required />
                                            </div>
                                            <div>
                                                <label>Password</label>
                                                <input type="password" name="password" value={this.state.password} onChange={this.onChange} required />
                                            </div>
                                            {/* <div className="text-center"><button type="submit" className="amitBtnLight">CONTINUE <img src="/images/icons/black-right-arrow.svg"/> </button></div> */}
                                            <div className="text-center"><button type="submit" className="amitBtnRound">Sign Up </button></div>
                                        </form>
                                        <p>OR REGISTER WITH</p>
                                        <div className="gofb">
                                            <GoogleLogin clientId={this.state.clientId} buttonText="Login" onSuccess={regGoogle} onFailure={regGoogle} render={renderProps => ( <img src="/images/icons/google.svg" onClick={renderProps.onClick}/> )}></GoogleLogin>
                                            <FacebookLogin appId={this.state.appId} fields="name,email,picture" callback={regFB} render={renderProps => ( <img src="/images/icons/facebook.svg" onClick={renderProps.onClick}/> )}/>
                                        </div> 
                                    </>
                                    : this.state.active=="Login"?
                                        <>
                                            <form onSubmit={this.loginHandler}>
                                                <label>Email</label>
                                                <input type="text" name="email" id="email" required onChange={this.onChange} value={this.state.email}/>
                                                <label>Password</label>
                                                <input type="password" name="password" id="password" required onChange={this.onChange} value={this.state.password} />
                                                <div className="text-center"><button type="submit" className="amitBtnRound">Login </button></div>
                                            </form>
                                            <p>OR LOGIN WITH</p>
                                            <div className="gofb">
                                                <GoogleLogin clientId={this.state.clientId} buttonText="Login" onSuccess={loginGoogle} onFailure={loginGoogle} render={renderProps => ( <img src="/images/icons/google.svg" onClick={renderProps.onClick}/> )}></GoogleLogin>
                                                <FacebookLogin appId={this.state.appId} fields="name,email,picture" callback={loginFB} render={renderProps => ( <img src="/images/icons/facebook.svg" onClick={renderProps.onClick}/> )}/>

                                                {/* <GoogleLogin clientId={this.state.clientId} buttonText="Login with Google" onSuccess={loginGoogle} onFailure={loginGoogle} ></GoogleLogin>
                                                <FacebookLogin appId="476215263560097" autoLoad={false} fields="name,email,picture" callback={loginFB}/> */}
                                            </div>
                                            <div className="text-center"><a href={func.base+"forgotPassword"}>Forgot password</a></div>
                                        </>
                                    : this.state.active=="logOut"?
                                    <>
                                        <p>Click below button to log out</p>
                                        <div className="text-center"><button type="submit" className="amitBtnRound" onClick={this.logout}>Log Out</button></div>
                                    </>
                                    : null}
                                </div>                                   
                                <p>Inviting enterprising and resourceful women and men to join our</p>
                                <h3>AFFILIATE VIJAYA PROGRAM</h3>
                                <div className="gstore">
                                    <p>Get App from Google Play Store</p>
                                    <div className="text-center store"><a href="" className="amitBtnRound"><img src="/images/icons/playstore.svg"/> DOWNLOAD </a></div>
                                </div>
                                {/* <div className="check"><button>CHECK NOW</button></div> */}
                            </div>
                        </div>
                    </div>
                    <img src="/images/static/cotton.png" className="cotton"/>
                </section>
            </>
        )
    }
}

export default Auth
