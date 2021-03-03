import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './src/parts/Header'
import Footer from './src/parts/Footer'

import Home from './src/pages/Home'

import Register from './src/auth/Register'
import Login from './src/auth/Login'
import ForgotPassword from './src/auth/ForgotPassword'
import ResetPassword from './src/auth/ResetPassword'

// import AdminUser from './src/admin/User'
// import Attendance from './src/admin/Attendance'
// import Garbage from './src/admin/Garbage'
// import Basic from './src/admin/Basic'

// import RequireAdmin from './src/parts/RequireAdmin'
// import RequireAdminSup from './src/parts/RequireAdminSup'

const base = '/'

function Index() {
    return (
        <Router>
            <Header/> 
            <Switch>
                <Route exact path= {base} component={Home}/>
                <Route exact path={base+"register"} component={Register}/>
                <Route exact path={base+"login"} component={Login}/>
                <Route exact path="/forgotPassword" component={ForgotPassword} /> 
                <Route exact path="/resetPassword/:token" component={ResetPassword} />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Index

if (document.getElementById('root')) { ReactDOM.render(<Index />, document.getElementById('root')) }