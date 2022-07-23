const KEY = "7VLDP6D9CZQAyGi6Q0VPH6qUv-s4NUO7dQtBxHiLNMo";
const url = `https://api.unsplash.com/photos/random?client_id=${KEY}&count=5`;
const carousel = document.getElementById('carousel');

/* 
    Loop through data and return a list of 5 photo urls
*/
const getFivePhotos = async () => {
    try {
        let result = await fetch(url);
        let data = await result.json();
        // console.log(data);
        let imageList = [];
        // loop thorugh data and store image raw url into imageList array and return it to get 5 random photos from unsplash
        for(let i = 0; i < data.length; i++) {
            let photo = data[i];
            imageList.push(photo.urls.raw);
        }

        return imageList;
    } catch (error) {
        console.log(error);
    }
}

let photos;
let index;

// right now, this code randomly sets carousels background image to a photo from our api call
getFivePhotos().then(photosList => {
    photos = photosList;
        index = 0;
    console.log(photos);
    carousel.style.backgroundImage = `url(${photos[0]})`;
}) 

const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');

prevBtn.addEventListener('click', ()=> {
    if(index === 0) {
        index = photos.length - 1;
        carousel.style.backgroundImage = `url(${photos[index]})`
    } else {
        index--;
        carousel.style.backgroundImage = `url(${photos[index]})`
    }
})

nextBtn.addEventListener('click', ()=> {
    if(index === photos.length - 1) {
        index = 0;
        carousel.style.backgroundImage = `url(${photos[index]})`;
    } else {
        index++;
        carousel.style.backgroundImage = `url(${photos[index]})`;
    }
})