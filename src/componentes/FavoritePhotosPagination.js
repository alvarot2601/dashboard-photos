import React, { useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { theme } from "../App";
import Button from "@mui/material/Button";

export const FavoritePhotosPagination = (props) => {
  const { setPage, totalPages, page } = props;
  const [arrayPagination, setArrayPagination] = useState([]);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    let newArr = [];
    for (let i = 1; i <= totalPages; i++) {
      newArr.push(i);
    }
    setArrayPagination(newArr);
    setActivePage(1);
    setPage(1);
  }, [totalPages]);
  const onChangeHandler = (e) => {
    //document.getElementsByClassName("Mui-selected ")[0].classList.remove("Mui-selected");
    setActivePage(e.target.textContent);
    setPage(e.target.textContent);
    console.log("cambio: ", e.target.textContent);
    window.scroll(0, 0);
  };
  return (
    <div>
      
      <ul>
        {arrayPagination.map((page, index) => {
          return index === 0 ? (
            <li key={`pag_${index}`}>
              <Button
                variant="contained"
                onClick={onChangeHandler}
                count={totalPages}
                className={(activePage == page) ? 'selected pagination_button' : 'pagination_button'}
              >
                {page}
              </Button>
            </li>
          ) : (
            <li key={`pag_${index}`}>
              <Button
                variant="contained"
                onClick={onChangeHandler}
                count={totalPages}
                className={ (activePage == page) ? 'selected pagination_button' : 'pagination_button'}
              >
                {page}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
/*<Pagination
        sx={{
          width: "80%",
          margin: "auto",
          div: {
            color: "white",
          },
          ul: {
            justifyContent: "center",
          },
          [theme.breakpoints.down("tablet")]: {
            width: "100%",
            flexWrap: "nowrap",
            li: {
              margin: 0,
            },
          },
        }}
        defaultPage={1}
        count={totalPages > 1 ? totalPages : 0}
        hidePrevButton
        hideNextButton
        color="primary"
        onChange={onChangeHandler}
      ></Pagination> */