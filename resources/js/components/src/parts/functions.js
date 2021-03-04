export function callSwal(mesg){ swal({ title: mesg, timer: 4000 }) }
export function printError(mesg){ console.log('mesg', mesg) }

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
    {id: 1, img: 'home-1.jpg', title: 'Samsung S8', price: '35, 000', text: 'Some text about the Mobile.'},
    {id: 2, img: 'home-2.jpg', title: 'Iphone 12', price: '1,10, 000', text: 'Some text about the Mobile.'},
    {id: 3, img: 'home-3.jpg', title: 'Vivo v17 pro', price: '25, 000', text: 'Some text about the Mobile.'},
    {id: 4, img: 'home-1.jpg', title: 'Redmi 12', price: '15, 000', text: 'Some text about the Mobile.'},
    {id: 5, img: 'home-2.jpg', title: 'Real me 9', price: '12, 000', text: 'Some text about the Mobile.'},
    {id: 6, img: 'home-3.jpg', title: 'Oppo 12 pro', price: '17, 000', text: 'Some text about the Mobile.'},
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
