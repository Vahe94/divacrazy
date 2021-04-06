import {db} from "../initilizeFb";

export async function getCollection(collection, menuId)
{
  const docs = [];
  let colQuery = db.collection(collection);
  if (menuId) {
    colQuery = colQuery.where('menuId', '==', menuId);
  }
  return await colQuery.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => docs.push({...doc.data(), id: doc.id}));
      return docs;
    });
}
