import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {getMenus} from "../../sevices/menu/menuApi";
import MenuCard from "../../components/menuCard/MenuCard";
import Spinner from "../../components/Spinner";
import {Redirect, Route, Switch} from "react-router-dom";
import Menu from "../menu/Menu";

const  Dashboard = () =>
{
  const [menus, setMenus] = React.useState([]);

  useEffect(( ) => {
     getMenus().then(data => {
       console.log(data, 'data atsdatsdvagsd')
       setMenus(m => data);
     })
  }, [])

  console.log(menus, 'menus')
  return (
    <Container component="main" maxWidth="xs">
      {
        menus.map((menu,i) => {
          return <MenuCard key={menu.id} {...menu} handleDuplicate={handleDuplicate} handleDelete={handleDelete}/>
        })
      }
    </Container>
  );

  function handleDuplicate(id) {

  }

  function handleDelete(id) {
    // changeMenus
  }

  // function changeMenu(changedMenu)
  // {
  //   const menuIndex = menus.findIndex(menu => menu.id === changedMenu.id);
  //   if(menuIndex!== -1) {
  //     const clonedMenus = cloneDeep(menus);
  //     clonedMenus.splice(menuIndex, 1, changedMenu);
  //
  //     setMenus(m => clonedMenus);
  //   }
  // }
};

export default Dashboard;
