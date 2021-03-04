const func = require('./functions')

export default {
    register: func.base+'api/register',
    login: func.base+'api/login',
    logout: func.base+'api/logout',
    forgotPassword: func.base+'api/forgotPassword',
    resetPassword: func.base+'api/resetPassword',

    adminUsers : func.base+'api/adminUsers',
}