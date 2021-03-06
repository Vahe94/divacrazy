import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./menuCard.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import DeleteConfirm from "../DeleteConfirm";
import {deleteMenu} from "../../sevices/menu/menuApi";

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
}));

const MenuCard = ({id, name, description, menus, setMenus}) => {
  const classes = useStyles();
  const history = useHistory();
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  const handleClickDelete = (event) => {
    event.stopPropagation();
    setOpenDeleteConfirm(true);
  };

  const onOpenMenu = (event) => {
    history.push(`/menus/${id}`);
  }

  useEffect(() => {
    if (confirm) {
      deleteMenu(id).then(() => {
        let tempMenus = [...menus];
        tempMenus = tempMenus.filter(menu => {
          return id !== menu.id;
        })
        setMenus(tempMenus)
        setOpenDeleteConfirm(false);
      })
    }
  }, [confirm]);

  return (
    <Card className={classes.root}  onClick={onOpenMenu}>
      <CardContent>
        <Typography className={classes.name} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.description} variant="body2" component="p">
          {description}
        </Typography>
        <div>
          <Button
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
      </CardContent>
      <DeleteConfirm setIsOpen={setOpenDeleteConfirm} isOpen={openDeleteConfirm} setConfirm={setConfirm}/>
    </Card>
  );
};

export default MenuCard;
