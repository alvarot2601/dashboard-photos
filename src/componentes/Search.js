import React, { useState, useContext, createContext } from "react";

const Search = (props) => {
 

  const handleClick = async () => {
    const response = await fetch(
      "https://api.unsplash.com/search/photos/?query=car&client_id=68CyGDmE1a7FiglE6ufSenlEKv-mqBbqy5lvRv4owGU"
    );
    const data = await response.json();
    props.setImages(data.results);
  };

  const saveImage = (e) => {
    const actualDate = new Date();
    const actualDateTime =
      actualDate.getDay() +
      "/" +
      actualDate.getMonth() +
      "/" +
      actualDate.getFullYear() +
      " " +
      actualDate.getHours() +
      ":" +
      actualDate.getMinutes();
    const [img] = props.images.filter((img) => img.id === e.target.name);
    const properties = {
      id: img.id,
      description: img.description,
      width: img.width,
      height: img.height,
      likes: img.likes,
      urls: [img.urls.full, img.urls.thumb],
      actualDateTime: actualDateTime,
    };
    localStorage.setItem('saved_images_' + properties.id, JSON.stringify(properties));
    console.log(properties);
  };

  return (
    <>
      <main className="main__search">
        <input type="text" placeholder="Search any photo" />
        <input type="submit" value="Search" onClick={handleClick} />
        <div className="images-container">
          {props.images.map((img, index) => {
            return (
              <div key={img.id}>
                <button onClick={saveImage} name={img.id}>
                  Add to my photos
                </button>
                <img src={img.urls.full} />
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
export default Search;
