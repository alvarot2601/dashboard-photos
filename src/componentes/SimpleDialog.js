import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DownloadIcon from "@mui/icons-material/Download";

import { saveAs } from "file-saver";
const emails = ['username@gmail.com', 'user02@gmail.com'];


function SimpleDialog(props) {
  const { onClose, selectedValue, open, likes, width, height, date, downloadUrl, id, description } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const downloadImage = (link, id) => {
    saveAs(link, `${id}.png`);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <b>Description: </b> {description}
        </ListItem>
        <ListItem>
            <b>Likes: </b> {likes}
        </ListItem>
        <ListItem><b>Width: </b> {width}px</ListItem>
        <ListItem> <b>Height: </b> {height}px</ListItem>
        <ListItem><b>Date: </b> {date}</ListItem>
        <ListItem>
                <DownloadIcon onClick={() => downloadImage(downloadUrl, id)}></DownloadIcon>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const {likes, width, height, date, downloadUrl, id, description} = props;
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <InfoTwoToneIcon onClick={handleClickOpen}></InfoTwoToneIcon>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        likes={likes}
        width={width}
        height={height}
        date={date}
        downloadUrl={downloadUrl}
        id={id}
        description={description}
      />
    </div>
  );
}
