import { React, createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componentes/Home.js";
import Search from "./componentes/Search.js";
import Root from "./componentes/Root.js";
import MyPhotos from "./componentes/MyPhotos.js";



const imagesContext = createContext();

const App = () => {
  const [images, setImages] = useState([]);
  return (
    <imagesContext.Provider value={images} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search imagesContext={imagesContext} images = {images} setImages={setImages} />} />
            <Route path="myphotos" element={<MyPhotos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </imagesContext.Provider>
  );
};
export default App;
