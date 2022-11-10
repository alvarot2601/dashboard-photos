import {React, useEffect, useState} from "react";
const MyPhotos = (props) => {

  const [savedImages, setSavedImages] = useState([]);
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCategory, setSortCategory] = useState('date');
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
  const handleSortCategory = (e) => {
    setSortCategory(e.target.value);
  }
  console.log(sortCategory)

    return (
      <div className="savedImages-container">
        <input type='text' placeholder="Search by description" onChange={searchByDescription} />
        <select onChange={handleSortCategory}>
          <option value='date'>Date</option>
          <option value='width'>Width</option>
          <option value='height'>Height</option>
          <option value='likes'>Likes</option>
        </select>
        {
          savedImages
          .filter((img) => (img.description === null && searchTerm ==='') || (img.description !== null && img.description.toLowerCase().search(searchTerm.toLowerCase()) !== -1) )
          .sort( (a, b) => {
            if(sortCategory==='date')
            {
              return new Date(a[sortCategory]) - new Date(b[sortCategory])
            }
            return a[sortCategory] - b[sortCategory];
          } )
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
                likes={img.likes}
                widthprop={img.width}
                heightprop={img.height}
                date={img.date}
                 />
              </div>
            )
          })
          
        }
    </div>
    );
};
export default MyPhotos;
