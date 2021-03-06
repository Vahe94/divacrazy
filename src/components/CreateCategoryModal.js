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

export default function CreateCategoryModal({isOpen, setIsOpen, categories, setCategories, menuId, categoryId, editCategory, setEditCategory}) {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen])

  const handleClose = () => {
    setEditCategory(null);
    setOpen(false);
    setIsOpen(false);
  };

  const onSubmit = (data, e) => {
    data.menuId = menuId;
    data.parent = categoryId || null;
    if (!editCategory) {
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
              createCategory(data).then((res) => {
                setCategories([...categories, res]);
                setImage(null);
                setOpen(false);
                setIsOpen(false);
              });
            });
          }
        );
      } else {
        createCategory(data).then((res) => {
          setCategories([...categories, res]);
          setImage(null);
          setOpen(false);
          setIsOpen(false);
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
              updateCategory(data, editCategory.id).then((res) => {
                let tempCategories = [...categories];
                data.id = editCategory.id;
                tempCategories = tempCategories.map((cat) => {
                  return cat.id === editCategory.id ? data : cat;
                })
                setCategories([...tempCategories]);
                setOpen(false);
                setIsOpen(false);
                setEditCategory(null);
              });
            });
          }
        );
      } else {
        if (imageUrl) {
          data.image = imageUrl;
        }
        updateCategory(data, editCategory.id).then((res) => {
          let tempCategories = [...categories];
          data.id = editCategory.id;
          tempCategories = tempCategories.map((cat) => {
            return cat.id === editCategory.id ? data : cat;
          })
          setCategories([...tempCategories]);
          setOpen(false);
          setIsOpen(false);
          setEditCategory(null);
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

  useEffect(() => {
    if (editCategory?.id) {
      setImageUrl(editCategory.image);
    }
  }, [editCategory])

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{editCategory?.id ? "Edit Category" : "Create Category" }</h2>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          defaultValue={editCategory?.id ? editCategory.name : ''}
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
          defaultValue={editCategory?.id ? editCategory.description : ''}
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
        <DropzoneArea
          filesLimit={1}
          onChange={handleChange}
        />
        <Button
          name="category"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {editCategory?.id ? "Edit" : "Create" }
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
