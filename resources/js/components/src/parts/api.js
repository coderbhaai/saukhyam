const func = require('./functions')

export default {
    register: func.base+'api/register',
    login: func.base+'api/login',
    logout: func.base+'api/logout',
    forgotPassword: func.base+'api/forgotPassword',
    resetPassword: func.base+'api/resetPassword',

    adminUsers : func.base+'api/adminUsers',
    adminBasics : func.base+'api/adminBasics',
    createBasic : func.base+'api/createBasic',
    updateBasic : func.base+'api/updateBasic',

    adminProducts : func.base+'api/adminProducts',
    addProductOptions : func.base+'api/addProductOptions',
    changeProductStatus : func.base+'api/changeProductStatus',
    createProduct : func.base+'api/createProduct',
    updateProduct : func.base+'api/updateProduct',
}