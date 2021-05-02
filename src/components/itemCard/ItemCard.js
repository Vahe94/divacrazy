import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./itemCard.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import DeleteConfirm from "../DeleteConfirm";
import { CardActions, CardHeader, CardMedia } from "@material-ui/core";
import { deleteItem } from "../../sevices/item/itemApi";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  name: {
    fontSize: 14,
    marginLeft: 8
  },
  description: {
    marginLeft: 8
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


const ItemCard = ({item, items, setItems, menuId, setIsOpenItemModal, setEditItem}) => {
  const classes = useStyles();
  const history = useHistory();
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const {id, name, description, image} = item;

  const handleClickDelete = (event) => {
    event.stopPropagation();
    setOpenDeleteConfirm(true);
  };

  const handleClickEdit = (event) => {
    event.stopPropagation();
    setIsOpenItemModal(true);
    setEditItem(item);
  };

  const onOpenMenu = (event) => {
    history.push(`/items/${id}?menuId=${menuId}`);
  }

  useEffect(() => {
    if (confirm) {
      deleteItem(id).then(() => {
        let tempItems = [...items];
        tempItems = tempItems.filter(category => {
          return id !== category.id;
        })
        setItems(tempItems)
        setOpenDeleteConfirm(false);
      })
    }
  }, [confirm]);

  return (
    <Card className={classes.root}  onClick={onOpenMenu}>
      <CardHeader
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={image}
      />
      <CardContent>
        <Typography className={classes.description} variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div>
          <Button
            onClick={handleClickEdit}
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleClickDelete}
          >
            Delete
          </Button>
        </div>
      </CardActions>
      <DeleteConfirm setIsOpen={setOpenDeleteConfirm} isOpen={openDeleteConfirm} setConfirm={setConfirm}/>
    </Card>
  );
};

export default ItemCard;
