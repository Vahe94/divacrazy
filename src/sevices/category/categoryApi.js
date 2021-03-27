import {db} from "../../initilizeFb";
import {getCollection} from "../api";

const collectionName = "category";

export async function getCategories()
{
  return await getCollection(collectionName);
}

export async function getCategory(id)
{
  return await db.collection(collectionName).doc(id)
    .get()
    .then(doc => {
      if(doc.exists) {
        return ({...doc.data(), id: doc.id})
      }
    });
}

export async function createCategory(data)
{
  return await db.collection(collectionName)
    .add(data)
    .then(docRef => ({...data, id: docRef.id}));
}

export async function updateCategory(data, id)
{
  return await db.collection(collectionName).doc(id)
    .update(data)
    .then(docRef => ({...data, id: docRef.id}));
}

export async function deleteCategory(id)
{
  return await db.collection(collectionName).doc(id)
    .delete()
    .then(() => console.log("category deleted" , id));
}
