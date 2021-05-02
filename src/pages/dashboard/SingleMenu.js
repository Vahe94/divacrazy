import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { getCategories } from "../../sevices/category/categoryApi";
import { useLocation, useParams } from 'react-router-dom'
import Button from "@material-ui/core/Button";
import CreateCategoryModal from "../../components/CreateCategoryModal";
import Grid from "@material-ui/core/Grid";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import { makeStyles } from "@material-ui/core/styles";
import { getItems } from "../../sevices/item/itemApi";
import CreateItemModal from "../../components/CreateItemModal";
import ItemCard from "../../components/itemCard/ItemCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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

const  SingleMenu = (props) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [isOpenItemModal, setIsOpenItemModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const classes = useStyles();
  let { menuId } = useParams();
  const { categoryId } = useParams();
  let query = useQuery();
  menuId = menuId ? menuId : query.get("menuId");

  const onCreateCategoryClick = () => {
    setIsOpenCategoryModal(true);
  }

  const onCreateItemClick = () => {
    setIsOpenItemModal(true);
  }

  useEffect(() => {
    const id = categoryId || menuId;
    const isMenu = !categoryId;
    getCategories(id, isMenu).then(data => {
      console.log(data, 'data atsdatsdvadsfsdfsdfsdfsdfsdfsdfgsd')
      setCategories(data);
    })
    getItems(id, isMenu).then(data => {
      console.log(data, 'data atsdatsdvadsfsdfsdfsdfsdfsdfsdfgsd')
      setItems(data);
    })
  }, [menuId, categoryId])

  return (
    <Container className={classes.container} component="main">
      <div className={classes.root}>
        Categories
        <Grid container spacing={3}>
          {
            categories.map((category) => {
              return(
                <Grid key={category.id} item xs={6}>
                  <CategoryCard
                    setIsOpenCategoryModal={setIsOpenCategoryModal}
                    setEditCategory={setEditCategory}
                    key={category.id}
                    menuId={menuId}
                    category={category}
                    categories={categories}
                    setCategories={setCategories}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </div>
      <div className={classes.root}>
        Items
        <Grid container spacing={3}>
          {
            items.map((item,i) => {
              return(
                <Grid key={item.id} item xs={6}>
                  <ItemCard
                    setIsOpenItemModal={setIsOpenItemModal}
                    setEditItem={setEditItem}
                    key={item.id}
                    menuId={menuId}
                    item={item}
                    items={items}
                    setItems={setItems}
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
        onClick={onCreateCategoryClick}>
        Create Category +
      </Button>
      <Button
        className={classes.createButton}
        variant="contained"
        color="primary"
        onClick={onCreateItemClick}>
        Create Item +
      </Button>
      <CreateCategoryModal
        isOpen={isOpenCategoryModal}
        setIsOpen={setIsOpenCategoryModal}
        categories={categories}
        setCategories={setCategories}
        menuId={menuId}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
      />
      <CreateItemModal
        isOpen={isOpenItemModal}
        setIsOpen={setIsOpenItemModal}
        items={items}
        setItems={setItems}
        menuId={menuId}
        categoryId={categoryId}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </Container>
  );
};

export default SingleMenu;
