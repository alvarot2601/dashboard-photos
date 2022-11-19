import React from "react";
import Pagination from "@mui/material/Pagination";
import {theme} from "../App";
export const PhotosPagination = (props) => {
  const { setPage, page } = props;

  const onChangeHandler = (e) => {
    if (parseInt(e.target.textContent) === NaN)
      console.log(
        parseInt(e.target.textContent)
      ); //setPage(parseInt(page) - 1);
    else setPage(e.target.textContent);
    window.scroll(0,0);
  };

  return (
    <div>
      <Pagination
      sx={{
        width:'80%',
        margin:'auto',
        [theme.breakpoints.down("tablet")]: {
            width: '100%',
            flexWrap:'nowrap',
            li:{
                margin:0
            }
        },
        div:{
            color:'white'
        }
      }}
        count={10}
        hidePrevButton
        hideNextButton
        variant="outlined"
        color="primary"
        onChange={onChangeHandler}
      ></Pagination>
    </div>
  );
};
