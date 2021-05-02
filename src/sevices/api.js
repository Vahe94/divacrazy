import {db} from "../initilizeFb";

export async function getCollection(collection, menuId, isMenu)
{
  console.log(menuId, isMenu, 'menuId, isMenu');
  const docs = [];
  let colQuery = db.collection(collection);
  if (menuId) {
    if (isMenu) {
      colQuery = colQuery.where('menuId', '==', menuId);
      colQuery = colQuery.where('parent', '==', null);
    } else {
      colQuery = colQuery.where('parent', '==', menuId);
    }
  }
  return await colQuery.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => docs.push({...doc.data(), id: doc.id}));
      return docs;
    });
}
