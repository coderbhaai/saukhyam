import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
const func = require('../parts/functions')

class Register extends Component {
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
            image:                      '',
            clientId:                   '915022609455-q7nh558mli08jvgk691gksddalp6gk2k.apps.googleusercontent.com',
            clientSecret:               'fitq9oKd_98f20gOY9cWwoCe'            
        }
    }
        
    componentDidMount(){
        window.scrollTo(0, 0)
        console.log('Mounted')
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            if(JSON.parse(localStorage.getItem('user')).role){
                this.setState({ auth: true })
                window.location.href = '/'
            }
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
            password:                   this.state.password,
            password_confirmation:      this.state.password_confirmation,
            provider:                   this.state.provider,
        }
        axios.post('/api/register', data)
        .then( res=>{
            console.log('res', res)
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
        console.log('res', res)
        console.log('type', type)
        if(type=='Google'){
            var data = {
                name:                   res.profileObj.name,
                email:                  res.profileObj.email,
                password:               res.googleId,
                image:                  res.profileObj.imageUrl,
                provider:               'Google',
                role:                   this.state.role
                
            };
        }else if(type=='FB'){
            var data = {
                name:                   res.name,
                email:                  res.email,
                password:               res.userID,
                image:                  res.picture.data.url,
                provider:               'FB',
                role:                   this.state.role
            };
        }
        axios.post('/api/register', data)
            .then( res=>{
                console.log('res', res)
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
        console.log('this.state', this.state)
        const regGoogle = (res) => { this.gofbRegisteration(res, 'Google'); }
        const regFB = (res) => { this.gofbRegisteration(res, 'FB'); }

        return (
            <section className="auth">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>Register</h2>
                            <p>Already have an account <a href="/login">Sign in</a></p>
                            <div className="gofb">
                                <GoogleLogin clientId={this.state.clientId} buttonText="Register with Google" onSuccess={regGoogle} onFailure={regGoogle} ></GoogleLogin>
                                <FacebookLogin textButton="Sign up with Facebook" appId="476215263560097" autoLoad={false} fields="name,email,picture" callback={regFB}/>
                            </div>                            
                            <p className="py-3">Or create with</p>
                            <form onSubmit={this.submitHandler}>
                                <label>Enter your name</label>
                                <input type="text" placeholder="Enter name" name="name" value={this.state.name} onChange={this.onChange} required />
                                <label>Email</label>
                                <input type="text" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange} required />
                                <label>Phone</label>
                                <input type="text" placeholder="Enter phone" name="phone" value={this.state.phone} onChange={this.onChange} required />
                                <label>Password</label>
                                <input type="password" placeholder="Enter password" name="password" value={this.state.password} onChange={this.onChange} required />
                                <button type="submit" className="amitBtn">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Register