import {db} from './firebase.config'



const addInDocument = (collections,document, data) => {
    db.collections(collections).doc(document).set(data);
}

const add = (collections, data) => {
    db.collection(collections).add(data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


const read = async (collections)=>{
    return await db.collection(collections).get()
    .then((querySnapshot) => {
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ref : doc.id, ...doc.data()})
        });
        return data;
    });
}
const readDocument = async(collections, document) => {
    return await db.collection(collections).doc(document).get()
    .then(function(doc) {
        if (doc.exists) {
           return {ref : doc.id, ...doc.data()};
        } else {
            console.log("no document")
           return null;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        return null;
    })
}

const query = async (collections, query) => {
  let queryIsValid = query.hasOwnProperty('field') && query.hasOwnProperty('operator') && query.hasOwnProperty('value');
  if(!queryIsValid) return null;
  
  return await db.collection(collections).where(query.field, query.operator, query.value)
    .get()
    .then(function(querySnapshot) {
        let data = null
        querySnapshot.forEach(function(doc) {
            data =  {ref : doc.id, ...doc.data()};
        });
        return data;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


// update element

const update = (collections, document,data) => {
    db.collection(collections).doc(document).set(data)
      .then(() => console.log('update pass.'))
      .catch((e)=> console.log(e));
}

const updateField = (collections, document,field) => {
    db.collection(collections).doc(document).update(field)
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
}




export {read,readDocument, add, addInDocument, query, update, updateField }
