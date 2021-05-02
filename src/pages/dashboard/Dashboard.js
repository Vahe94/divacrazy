import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {getMenus} from "../../sevices/menu/menuApi";
import MenuCard from "../../components/menuCard/MenuCard";
import Button from "@material-ui/core/Button";
import CreateMenuModal from "../../components/CreateMenuModal";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    padding: '30px 20px',
  },
  createButton: {
    marginTop: '15px'
  }
}));

const  Dashboard = () =>
{
  const [menus, setMenus] = React.useState([]);
  const [isOpenMenuModal, setIsOpenMenuModal] = React.useState(false);
  const classes = useStyles();

  useEffect(( ) => {
     getMenus().then(data => {
       console.log(data, 'data atsdatsdvagsd')
       setMenus(m => data);
     })
  }, [])

  const onCreateMenuClick = () => {
    setIsOpenMenuModal(true);
  }

  return (
    <Container className={classes.container} component="main">
      <div className={classes.root}>
        <Grid container spacing={3}>
            {
              menus.map((menu,i) => {
                return(
                  <Grid key={menu.id} item xs={6}>
                    <MenuCard
                      key={menu.id}
                      {...menu}
                      menus={menus}
                      setMenus={setMenus}
                    />
                  </Grid>
                  );
              })
            }
        </Grid>
      </div>
      <Button
        className={classes.createButton}
        variant="contained"
        color="primary"
        onClick={onCreateMenuClick}>
        Create Menu +
      </Button>
      <CreateMenuModal isOpen={isOpenMenuModal} setIsOpen={setIsOpenMenuModal} setMenus={setMenus} menus={menus}/>
    </Container>
  );
};

export default Dashboard;
