import {db} from "../../initilizeFb";
import {getCollection} from "../api";

const collectionName = "menu";

export async function getMenus()
{
  return await getCollection(collectionName);
}

export async function getMenu(id)
{
  return await db.collection(collectionName).doc(id)
    .get()
    .then(doc => {
      if(doc.exists) {
        return ({...doc.data(), id: doc.id})
      }
    });
}

export async function createMenu(data)
{
  return await db.collection(collectionName)
    .add(data)
    .then(docRef => ({...data, id: docRef.id}));
}

export async function updateMenu(data, id)
{
  return await db.collection(collectionName).doc(id)
    .update(data)
    .then(docRef => ({...data, id: docRef.id}));
}

export async function deleteMenu(id)
{
  return await db.collection(collectionName).doc(id)
    .delete()
    .then(() => console.log("menu deleted" , id));
}
