import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@material-ui/core";
import Draggable from 'react-draggable';


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DeleteConfirm = ({isOpen, setIsOpen, setConfirm}) => {

  const [open, setOpen] = React.useState(false);

  const handleClose = (status) => {
    if (status) {
      setConfirm(true);
    } else {
      setConfirm(false);
      setOpen(false);
      setIsOpen(false);
    }
  };


  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen])


  return (
    <Dialog
      onClick={ev => {
        ev.stopPropagation();
      }}
      open={open}
      onClose={() => {handleClose(false)}}
      PaperComponent={PaperComponent}
    >
      <DialogTitle>
        Delete Menu
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this menu?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => {handleClose(false)}} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {handleClose(true)}} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirm;
