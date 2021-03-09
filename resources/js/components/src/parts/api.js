const func = require('./functions')

export default {
    register: func.base+'api/register',
    login: func.base+'api/login',
    logout: func.base+'api/logout',
    forgotPassword: func.base+'api/forgotPassword',
    resetPassword: func.base+'api/resetPassword',

    adminUsers : func.base+'api/adminUsers',
    updateUser : func.base+'api/updateUser',
    adminBasics : func.base+'api/adminBasics',
    createBasic : func.base+'api/createBasic',
    updateBasic : func.base+'api/updateBasic',

    adminProducts : func.base+'api/adminProducts',
    addProductOptions : func.base+'api/addProductOptions',
    changeProductStatus : func.base+'api/changeProductStatus',
    createProduct : func.base+'api/createProduct',
    getProduct : func.base+'api/getProduct/',
    updateProduct : func.base+'api/updateProduct',

    adminTutorials : func.base+'api/adminTutorials',
    createTutorial : func.base+'api/createTutorial',
    updateTutorial : func.base+'api/updateTutorial',

    adminLanguages : func.base+'api/adminLanguages',
    createLanguage : func.base+'api/createLanguage',
    updateLanguage : func.base+'api/updateLanguage',

    adminFaqs : func.base+'api/adminFaqs',
    faqAnswer : func.base+'api/faqAnswer',
    changeFaqStatus : func.base+'api/changeFaqStatus',
    updateFaq : func.base+'api/updateFaq',

    adminOrders : func.base+'api/adminOrders',
    updateOrder : func.base+'api/updateOrder',


}