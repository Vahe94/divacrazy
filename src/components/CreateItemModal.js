import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import {ErrorMessage} from "@hookform/error-message";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import {createCategory, updateCategory} from "../sevices/category/categoryApi";
import {DropzoneArea} from 'material-ui-dropzone';
import {storageRef} from "../initilizeFb";
import {createItem, updateItem} from "../sevices/item/itemApi";
import {Checkbox, FormControlLabel} from "@material-ui/core";

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

export default function CreateItemModal({isOpen, setIsOpen, items, setItems, menuId, categoryId, editItem, setEditItem}) {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen])

  const handleClose = () => {
    setEditItem(null);
    setPublished(false);
    setOpen(false);
    setIsOpen(false);
  };

  const onSubmit = (data, e) => {
    data.menuId = menuId;
    data.parent = categoryId || null;
    data.published = published;
    if (!editItem) {
      if (image) {
        const uploadTask = storageRef.ref('DivaCrazy/').child(image.name).put(image);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.log("error:-", error)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              data.image = downloadURL;
              createItem(data).then((res) => {
                setItems([...items, res]);
                setOpen(false);
                setIsOpen(false);
                setPublished(false);
              });
            });
          }
        );
      } else {
        createItem(data).then((res) => {
          setItems([...items, res]);
          setOpen(false);
          setIsOpen(false);
          setPublished(false);
        });
      }
    } else {
      if (image) {
        const uploadTask = storageRef.ref('DivaCrazy/').child(image.name).put(image);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.log("error:-", error)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              data.image = downloadURL;
              updateItem(data, editItem.id ).then((res) => {
                let tempItems = [...items];
                data.id = editItem.id;
                tempItems = tempItems.map((item) => {
                  return item.id === editItem.id ? data : item;
                })
                setItems([...tempItems]);
                setOpen(false);
                setIsOpen(false);
                setEditItem(null);
                setPublished(false);
              });
            });
          }
        );
      } else {
        if (imageUrl) {
          data.image = imageUrl;
        }
        updateItem(data, editItem.id ).then((res) => {
          let tempItems = [...items];
          data.id = editItem.id;
          tempItems = tempItems.map((item) => {
            return item.id === editItem.id ? data : item;
          })
          setItems([...tempItems]);
          setOpen(false);
          setIsOpen(false);
          setEditItem(null);
          setPublished(false);
        });
      }
    }

  };

  const onError = (errors, e) => console.log(errors, e);

  const handleChange = (files) => {
    if (files.length) {
      setImage(files[0]);
    }
  }

  const handlePublished = (event) => {
    setPublished(event.target.checked);
  }


  useEffect(() => {
    if (editItem?.id) {
      setImageUrl(editItem.image);
      setPublished(editItem.published || false);
    }
  }, [editItem])

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{editItem?.id ? "Edit Item" : "Create Item" }</h2>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          defaultValue={editItem?.id ? editItem.name : "" }
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
          defaultValue={editItem?.id ? editItem.description : "" }
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
        <FormControlLabel
          control={
            <Checkbox
              checked={published}
              onChange={handlePublished}
              name="published"
              id="published"
              color="primary"
            />
          }
          label="Published"
        />
        <DropzoneArea
          filesLimit={1}
          onChange={handleChange}
        />
        <Button
          name="item"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {editItem?.id ? "Edit" : "Create" }
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
