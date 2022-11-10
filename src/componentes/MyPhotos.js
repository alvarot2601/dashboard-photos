import {React, useEffect, useState} from "react";
const MyPhotos = (props) => {

  const [savedImages, setSavedImages] = useState([]);
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    let savedImagesArr = [];

    for (let i = 0; i < localStorage.length; i++) {
      //si la key de los elementos de localstorage contiene 'saved_images_' entonces pushea la imagen al array
      if (localStorage.key(i).search("saved_images_") !== -1) {
        savedImagesArr.push(
          JSON.parse(localStorage.getItem(localStorage.key(i)))
        );
      }
    }
    console.log('saved arr: ' + savedImagesArr)
    console.log('SAVED IMAGES: ' + savedImages)
    setSavedImages(savedImagesArr);
    console.log('SAVED IMAGES: ' + savedImages)
  }, []);
  
  
  
  //event Handler
  const deletePhoto = (e) => {
    const photoId = e.target.name;
    for (let i = 0; i < localStorage.length; i++) {
      //si la key de los elementos de localstorage contiene 'saved_images_' entonces pushea la imagen al array
      if (localStorage.key(i).search(photoId) !== -1) {
        localStorage.removeItem(localStorage.key(i));
        break;
      }
    }
    setSavedImages(savedImages.filter( (img) => img.id !== photoId) );
  }


  const editDescription = (id) => {
    const newArr = savedImages.filter(img => {
      if(img.id === id)
      {
        console.log('descrip:' + img.description);
        img.description = description;
        console.log('descrip:' + img.description);
      }
      return img;
    })
    setSavedImages(newArr);
  }
 
  const handleChange = (e) =>  {
    setDescription(e.target.value);
  }

  const searchByDescription = (e) => {
    setSearchTerm(e.target.value);
  }
    return (
      <div className="savedImages-container">
        <input type='text' placeholder="Search by description" onChange={searchByDescription} />
        <select>
          <option value='1' selected>Date</option>
          <option value='2'>Width</option>
          <option value='3'>Height</option>
          <option value='4'>Likes</option>
        </select>
        {
          savedImages
          .filter((img) => img.description !== null && img.description.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
          .map( img => {
            return (
              <div key={img.id}>
                <div>
                  <button name={img.id} onClick={deletePhoto}>
                    Delete photo
                  </button>
                  <input type='text' onChange={handleChange} />
                  <button name={img.id} value={description} onClick={() => editDescription(img.id)}>
                    Edit title
                  </button>
                </div>
                <img
                src={img.urls[0]}
                alt={img.description}
                 />
              </div>
            )
          })
        }
    </div>
    );
  
};
export default MyPhotos;
