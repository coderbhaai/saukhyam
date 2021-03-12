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
    changeBasicStatus : func.base+'api/changeBasicStatus',

    adminProducts : func.base+'api/adminProducts',
    addProductOptions : func.base+'api/addProductOptions',
    changeProductStatus : func.base+'api/changeProductStatus',
    createProduct : func.base+'api/createProduct',
    getProduct : func.base+'api/getProduct/',
    updateProduct : func.base+'api/updateProduct',

    adminTutorials : func.base+'api/adminTutorials',
    createTutorial : func.base+'api/createTutorial',
    updateTutorial : func.base+'api/updateTutorial',
    changeTutorialStatus : func.base+'api/changeTutorialStatus',

    adminLanguages : func.base+'api/adminLanguages',
    createLanguage : func.base+'api/createLanguage',
    updateLanguage : func.base+'api/updateLanguage',

    adminFaqs : func.base+'api/adminFaqs',
    faqAdd : func.base+'api/faqAdd',
    faqAnswer : func.base+'api/faqAnswer',
    changeFaqStatus : func.base+'api/changeFaqStatus',
    updateFaq : func.base+'api/updateFaq',

    adminOrders : func.base+'api/adminOrders',
    updateOrder : func.base+'api/updateOrder',

    adminCentres : func.base+'api/adminCentres',
    createCentre : func.base+'api/createCentre',
    updateCentre : func.base+'api/updateCentre',
    
    adminNetworks : func.base+'api/adminNetworks',
    updateNetwork : func.base+'api/updateNetwork',

}