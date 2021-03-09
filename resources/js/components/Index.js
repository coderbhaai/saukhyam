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

import AdminUser from './src/admin/User'
import AdminBasics from './src/admin/Basics'
import AdminProducts from './src/admin/Products' 
import AddProduct from './src/admin/AddProduct' 
import UpdateProduct from './src/admin/UpdateProduct' 
import AdminTutorials from './src/admin/Tutorials'
import AdminLanguage from './src/admin/Language'
import AdminOrders from './src/admin/Orders'
import AdminFAQ from './src/admin/FAQ'

import RequireAdmin from './src/parts/RequireAdmin'

const func = require('./src/parts/functions')

function Index() {
    return (
        <Router>
            <Header/> 
            <Switch>
                <Route exact path= {func.base} component={Home}/>
                <Route exact path={func.base+"register"} component={Register}/>
                <Route exact path={func.base+"login"} component={Login}/>
                <Route exact path={func.base+"forgotPassword"} component={ForgotPassword} /> 
                <Route exact path={func.base+"resetPassword/:token"} component={ResetPassword} />  

                <Route exact path={func.base+"admin"} component={RequireAdmin(AdminUser)}/>
                <Route exact path={func.base+"adminUsers"} component={RequireAdmin(AdminUser)}/>
                <Route exact path={func.base+"adminBasics"} component={RequireAdmin(AdminBasics)}/>
                <Route exact path={func.base+"adminProducts"} component={RequireAdmin(AdminProducts)}/>
                <Route exact path={func.base+"addProduct"} component={RequireAdmin(AddProduct)}/>
                <Route exact path={func.base+"updateProduct/:id"} component={RequireAdmin(UpdateProduct)}/>
                <Route exact path={func.base+"adminTutorials"} component={RequireAdmin(AdminTutorials)}/>
                <Route exact path={func.base+"adminLanguage"} component={RequireAdmin(AdminLanguage)}/>
                <Route exact path={func.base+"adminOrders"} component={RequireAdmin(AdminOrders)}/>
                <Route exact path={func.base+"adminFaq"} component={RequireAdmin(AdminFAQ)}/>
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Index

if (document.getElementById('root')) { ReactDOM.render(<Index />, document.getElementById('root')) }