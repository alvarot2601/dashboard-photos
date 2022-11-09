import React from 'react';
const MyPhotos = (props) => {
    let savedImagesArr = [];
    for(let i=0;i<localStorage.length;i++)
    {
        //si la key de los elementos de localstorage contiene 'saved_images_' entonces pushea la imagen al array
        if(localStorage.key(i).search('saved_images_') !== -1){
            console.log(localStorage.key(i))
            savedImagesArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }  
    }
    console.log(savedImagesArr)
    return (
        <div className='savedImages-container' >
           {
            savedImagesArr.map( img => {
                return <img key={img.id} src={img.urls[0]} />
            })
           }
        </div>
    );
}
export default MyPhotos;