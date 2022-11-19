import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componentes/Home.js";
import Search from "./componentes/Search.js";
import Root from "./componentes/Root.js";
import MyPhotos from "./componentes/MyPhotos.js";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="myphotos" element={<MyPhotos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export {theme};
export default App;
