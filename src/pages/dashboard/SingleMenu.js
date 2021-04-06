import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import {getCategories} from "../../sevices/category/categoryApi";
import { useHistory, useParams } from 'react-router-dom'
import Button from "@material-ui/core/Button";
import CreateCategoryModal from "../../components/CreateCategoryModal";


const  SingleMenu = (props) =>
{
  const [menus, setMenus] = useState([]);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const { menuId } = useParams();

  const onCreateCategoryClick = () => {
    console.log(isOpenCategoryModal);
    setIsOpenCategoryModal(true);
  }

  useEffect(( ) => {
    getCategories(menuId).then(data => {
      console.log(data, 'data atsdatsdvadsfsdfsdfsdfsdfsdfsdfgsd')
      setMenus(m => data);
    })
  }, [])

  console.log(isOpenCategoryModal, 'isOpenCategoryModal')
  return (
    <Container component="main" maxWidth="xs">
      hiiii
      <Button onClick={onCreateCategoryClick}>Create Category +</Button>
      <CreateCategoryModal isOpen={isOpenCategoryModal} setIsOpen={setIsOpenCategoryModal}/>
    </Container>
  );
};

export default SingleMenu;
