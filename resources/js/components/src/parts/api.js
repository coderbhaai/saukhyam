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
    
    addProductLanguageOptions : func.base+'api/addProductLanguageOptions',
    productLanguages : func.base+'api/productLanguages',
    createProductLanguage : func.base+'api/createProductLanguage',
    getProductLanguage : func.base+'api/getProductLanguage/',
    getPendingLanguages : func.base+'api/getPendingLanguages/',
    updateProductLanguage : func.base+'api/updateProductLanguage',
    changeProductLanguageStatus : func.base+'api/changeProductLanguageStatus',

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

    adminWorkshop : func.base+'api/adminWorkshop',

    adminVideos : func.base+'api/adminVideos',
    createVideo : func.base+'api/createVideo',
    updateVideo : func.base+'api/updateVideo',

    adminNotification : func.base+'api/adminNotification',
    createNotification : func.base+'api/createNotification',
    updateNotification : func.base+'api/updateNotification',
    
    adminContact : func.base+'api/adminContact',
    adminRating : func.base+'api/adminRating',
}