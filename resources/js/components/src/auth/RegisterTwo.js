import React, { Component } from 'react'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
const func = require('../parts/functions')
import api from '../parts/api'
const secret = require('../parts/secret')

export class RegisterTwo extends Component {
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
                window.location.href = func.base
            }
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
    
    submitHandler = e => {
        e.preventDefault()
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
            if(res.data.success){
                localStorage.setItem('user', JSON.stringify(res.data.data))
                localStorage.setItem( 'message', res.data.message )
                window.location.href = '/'
            }else{
                func.callSwal(res.data.message)
            }
        })
        .catch(err=>func.printError(err))
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
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    localStorage.setItem( 'message', res.data.message )
                    window.location.href = '/'
                }else{
                    func.callSwal(res.data.message)
                }
            })
            .catch(err=>{ func.printError(err) })
    };

    render() {
        const regGoogle = (res) => { this.gofbRegisteration(res, 'Google'); }
        const regFB = (res) => { this.gofbRegisteration(res, 'FB'); }
        return (
            <>
                <section className="register authTwo">
                    <div className="topRow">
                        <img src="/images/static/banana.png" className="banana"/>
                        <img src="/images/logo2.png" className="logo"/>
                    </div>
                    <div className="container-fluid mainBody">
                        <div className="row">
                            <div className="col-sm-6 offset-3">
                                <h1>Register</h1>
                                <p>Already have an account? <span><a href="/login">SIGN IN</a></span></p>
                                <form onSubmit={this.submitHandler}>
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
                                    <div className="text-center"><button type="submit" className="amitBtnLight">CONTINUE <img src="/images/icons/black-right-arrow.svg"/> </button></div>
                                </form>
                                <p>OR REGISTER WITH</p>
                                <div className="gofb">
                                    <GoogleLogin clientId={this.state.clientId} buttonText="Login" onSuccess={regGoogle} onFailure={regGoogle} render={renderProps => ( <img src="/images/icons/googleIcon.svg" onClick={renderProps.onClick}/> )}></GoogleLogin>
                                    <FacebookLogin appId={this.state.appId} fields="name,email,picture" callback={regFB} render={renderProps => ( <img src="/images/icons/facebookIcon.svg" onClick={renderProps.onClick}/> )}/>
                                </div>    
                                <p>We are on a mission to make reusables mainstream and disposables known as the old fashioned choice that they really are. Inviting enterprising and resourceful women and men to join our</p>
                                <h3>AFFILIATE VIJAYA PROGRAM</h3>
                                <div className="check"><button>CHECK NOW</button></div>
                            </div>
                        </div>
                    </div>
                    <img src="/images/static/cotton.png" className="cotton"/>
                </section>
            </>
        )
    }
}

export default RegisterTwo
