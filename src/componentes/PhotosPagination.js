import React from "react";
import Pagination from "@mui/material/Pagination";
import {theme} from "../App";
export const PhotosPagination = (props) => {
  const { setPage, page, totalPages } = props;
  console.log("total pages" , totalPages)
  const onChangeHandler = (e) => {
    console.log("page , ", page)
    setPage(e.target.textContent);
    window.scroll(0,0);
  };
  
  return (
    <div>
      <Pagination
      sx={{
        width:'80%',
        margin:'auto',
        ul: {
          justifyContent:'center'
        },
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
        count={totalPages}
        hidePrevButton
        hideNextButton
        variant="outlined"
        color="primary"
        onChange={onChangeHandler}
      ></Pagination>
    </div>
  );
};
