import {db} from "../../initilizeFb";
import {getCollection} from "../api";

const collectionName = "items";

export async function getItems(itemId, isMenu) {
  return await getCollection(collectionName, itemId, isMenu);
}

export async function getItem(id) {
  return await db.collection(collectionName).doc(id)
    .get()
    .then(doc => {
      if(doc.exists) {
        return ({...doc.data(), id: doc.id})
      }
    });
}

export async function createItem(data)
{
  return await db.collection(collectionName)
    .add(data)
    .then(docRef => ({...data, id: docRef.id}));
}

export async function updateItem(data, id)
{
  return await db.collection(collectionName).doc(id)
    .update(data)
}

export async function deleteItem(id)
{
  return await db.collection(collectionName).doc(id)
    .delete()
    .then(() => console.log("item deleted" , id));
}
