export const base = '/'
// export const imgPath = "/storage/"
export const imgPath = "/saukhyam/storage/app/public/"

export function callSwal(mesg){ swal({ title: mesg, timer: 4000 }) }
export function printError(mesg){ console.log('mesg', mesg) }
export const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

export const params = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: { delay: 5000 },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },   
}

export const params2 = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 5000 },
    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 1, },
        640: { slidesPerView: 2, spaceBetween: 2, },
        768: { slidesPerView: 3, spaceBetween: 3, },
        // 1920: { slidesPerView: 4, spaceBetween: 3, },
    },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },   
}

export const testimony = [
    {id: 1, title: '- Amit Kumar Khare', img: 'amit.jpg', text:'"If you are considering a new laptop, looking for a powerful new car stereo or shopping for a new HDTV, we make it easy to find exactly what you need at a price you can afford."'},
    {id: 2, title: '- Amit Kumar Khare', img: 'home-1.jpg', text:'"If you are considering a new laptop, looking for a powerful new car stereo or shopping for a new HDTV, we make it easy to find exactly what you need at a price you can afford."'},
    {id: 3, title: '- Amit Kumar Khare', img: 'home-2.jpg', text:'"If you are considering a new laptop, looking for a powerful new car stereo or shopping for a new HDTV, we make it easy to find exactly what you need at a price you can afford."'},
    {id: 4, title: '- Amit Kumar Khare', img: 'home-1.jpg', text:'"If you are considering a new laptop, looking for a powerful new car stereo or shopping for a new HDTV, we make it easy to find exactly what you need at a price you can afford."'},
    {id: 5, title: '- Amit Kumar Khare', img: 'home-2.jpg', text:'"If you are considering a new laptop, looking for a powerful new car stereo or shopping for a new HDTV, we make it easy to find exactly what you need at a price you can afford."'},
    {id: 6, title: '- Amit Kumar Khare', img: 'home-1.jpg', text:'"If you are considering a new laptop, looking for a powerful new car stereo or shopping for a new HDTV, we make it easy to find exactly what you need at a price you can afford."'},
]

export const banner = [
    {id: 1, img: 'home-1.jpg'},
    {id: 2, img: 'home-2.jpg'},
    {id: 3, img: 'home-3.jpg'},
    {id: 4, img: 'home-1.jpg'},
    {id: 5, img: 'home-2.jpg'},
    {id: 6, img: 'home-3.jpg'},
]

export const products = [
    {id: 1, img: '1.jpg', title: 'Samsung S8', price: '35, 000', text: 'Some text about the Mobile.'},
    {id: 2, img: '2.jpg', title: 'Iphone 12', price: '1,10, 000', text: 'Some text about the Mobile.'},
    {id: 3, img: '3.jpg', title: 'Vivo v17 pro', price: '25, 000', text: 'Some text about the Mobile.'},
    {id: 4, img: '4.jpg', title: 'Redmi 12', price: '15, 000', text: 'Some text about the Mobile.'},
    {id: 5, img: '5.jpg', title: 'Real me 9', price: '12, 000', text: 'Some text about the Mobile.'},
    {id: 6, img: '6.jpg', title: 'Oppo 12 pro', price: '17, 000', text: 'Some text about the Mobile.'},
]

export const details = [
    {id: 1,  ptitle: 'Samsung S8', price: '35, 000', desc: 'Mushroom-derived Chitosan acts as a non-drying agent to keep your skin smooth and soft.', how: 'Uplift your spirits while eliminating germs from your skin with this refreshing and moisturizing all natural Lemongr',  ship: 'Mushroom-derived Chitosan acts as a non-drying agent to keep your skin smooth and soft.'},
    
]

export const productimage = [
    {id: 1, img: 'home-1.jpg'},
    {id: 2, img: 'home-2.jpg'},
    {id: 3, img: 'home-3.jpg'},
    {id: 4, img: 'home-1.jpg'},
    {id: 5, img: 'home-2.jpg'},
    {id: 6, img: 'home-3.jpg'},
]
 
export const adminLinks =[
    {text: 'Users', url: base+"adminUsers", active: base+"adminUsers"},
    {text: 'Masters', url: base+"adminBasics", active: base+"adminBasics"},
    {text: 'Products', url: base+"adminProducts", active: base+"adminProducts"},
    {text: 'Multilingual Products', url: base+"adminProductLanguage", active: base+"adminProductLanguage"},
    {text: 'Creatives', url: base+"adminTutorials", active: base+"adminTutorials"},
    {text: 'Language', url: base+"adminLanguage", active: base+"adminLanguage"},
    {text: 'Orders', url: base+"adminOrders", active: base+"adminOrders"},
    {text: 'FAQ', url: base+"adminFaq", active: base+"adminFaq"},
    {text: 'Production Centre', url: base+"productionCentre", active: base+"productionCentre"},
    {text: 'Workshop', url: base+"workshop", active: base+"workshop"},
    // {text: 'Network', url: base+"network", active: base+"network"},
]

export const basic =[
    {'single': true, text: 'Minimum Order Quantity', value: "MOQ"},
    {'single': true, text: 'Cash Discount', value: "CashDiscount"},
    {'single': false, text: 'Product Type', value: "ProductType"},
    {'single': false, text: 'Dimension Type', value: "DimensionType"},
    {'single': false, text: 'App Screen Name', value: "Screen"},
    {'single': false, text: 'Language', value: "Language"},
]

export const roles =[
    {text: 'Super Admin', value: "SuperAdmin"},
    {text: 'Area Manager', value: "Admin"},
    {text: 'Production Center In Charge', value: "Manager"},
    {text: 'Amrita', value: "Amrita"},
    {text: 'Vijaya', value: "Vijaya"},
    {text: 'User', value: "User"},
]

export const stateList =[
    { text: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { text: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { text: 'Assam', value: 'Assam' },
    { text: 'Bihar', value: 'Bihar' },
    { text: 'Chhattisgarh', value: 'Chhattisgarh' },
    { text: 'Goa', value: 'Goa' },
    { text: 'Gujarat', value: 'Gujarat' },
    { text: 'Haryana', value: 'Haryana' },
    { text: 'Himachal Pradesh', value: 'Himachal Pradesh' },
    { text: 'Jharkhand', value: 'Jharkhand' },
    { text: 'Karnataka', value: 'Karnataka' },
    { text: 'Kerala', value: 'Kerala' },
    { text: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { text: 'Maharashtra', value: 'Maharashtra' },
    { text: 'Manipur', value: 'Manipur' },
    { text: 'Meghalaya', value: 'Meghalaya' },
    { text: 'Mizoram', value: 'Mizoram' },
    { text: 'Nagaland', value: 'Nagaland' },
    { text: 'Odisha', value: 'Odisha' },
    { text: 'Punjab', value: 'Punjab' },
    { text: 'Rajasthan', value: 'Rajasthan' },
    { text: 'Sikkim', value: 'Sikkim' },
    { text: 'Tamil Nadu', value: 'Tamil Nadu' },
    { text: 'Telangana', value: 'Telangana' },
    { text: 'Tripura', value: 'Tripura' },
    { text: 'Uttarakhand', value: 'Uttarakhand' },
    { text: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { text: 'West Bengal', value: 'West Bengal' },
    { text: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands' },
    { text: 'Chandigarh', value: 'Chandigarh' },
    { text: 'Dadra and Nagar Haveli and', value: 'Dadra and Nagar Haveli and' },
    { text: 'Daman & Diu', value: 'Daman & Diu' },
    { text: 'Delhi', value: 'Delhi'},
    { text: 'Jammu & Kashmir', value: 'Jammu & Kashmir' },
    { text: 'Ladakh', value: 'Ladakh' },
    { text: 'Lakshadweep', value: 'Lakshadweep' },
    { text: 'Puducherry', value: 'Puducherry'}    
]


