import {db} from "../initilizeFb";

export async function getCollection(collection)
{
  const docs = [];
  return await db.collection(collection)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => docs.push({...doc.data(), id: doc.id}));
      return docs;
    });
}
