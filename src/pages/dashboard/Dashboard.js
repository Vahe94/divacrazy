import React, {Suspense} from 'react';
import Container from '@material-ui/core/Container';
import {getMenus} from "../../sevices/menu/menuApi";
import MenuCard from "../../components/menuCard/MenuCard";
import {cloneDeep} from "lodash-es";
import Spinner from "../../components/Spinner";
import {Redirect, Route, Switch} from "react-router-dom";

export default function Dashboard()
{
  const [menus, setMenus] = React.useState([]);

  React.useEffect(( ) => {
     getMenus().then(data => {
       setMenus(m => data);
     })
  }, [])

  console.log(menus)
  return (
    <Container component="main" maxWidth="xs">
      {
        menus.map((menu,i) => {
          return <MenuCard key={menu.id} {...menu} handleDuplicate={handleDuplicate} handleDelete={handleDelete}/>
        })
      }
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path={'/menu:id'} component={Menu} />
          <Redirect to={'/menus'} />
        </Switch>
      </Suspense>
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
}
