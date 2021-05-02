import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import {ErrorMessage} from "@hookform/error-message";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import login from "../helpers/loginHelper";
import {createMenu} from "../sevices/menu/menuApi";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateMenuModal({isOpen, setIsOpen, menus, setMenus}) {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen])

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const onSubmit = (data, e) => {
    console.log(data);
    createMenu(data).then((res) => {
      setMenus([...menus, res]);
      setOpen(false);
      setIsOpen(false);
    });
  };

  const onError = (errors, e) => console.log(errors, e);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create Menu</h2>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="name"
          name="name"
          autoFocus
          inputRef={register({ required: "name is required" })}
        />
        <ErrorMessage errors={errors} name="name" />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="description"
          name="description"
          inputRef={register({ required: "description is required" })}
        />
        <ErrorMessage errors={errors} name="description" />
        <Button
          name="menu"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create
        </Button>
      </form>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
