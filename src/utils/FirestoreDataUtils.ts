import moment from "moment";

export function getDataObjectFromArray(querySnapshot:any) {
  let data = null
  if (!querySnapshot.empty) {
    let doc = querySnapshot.docs[0];
    data = { ...doc.data() };
    data._id = doc.id;
  }

  return data
}

export function getDataObject(doc) {
  let data = null;
  if (doc.exists) {
    data = doc.data();
    data._id = doc.id;
  }

  return data
}

export async function getDataArray(querySnapshot) {
  let data = [];
  if (!querySnapshot.empty) {
    await querySnapshot.forEach(item => {
      let itemData;
      if (item) {
        itemData = item.data();
        itemData._id = item.id;
      }
      data.push(itemData)
    })
  }
  return data;
}

export const getFirestoreDate = (date, format) => {
  return formatDate(new Date(date && date.toDate ? date.toDate() : date), format)
}

export const formatDate = (date, format) => {
  return moment(date).format(format ?? "MM/DD/YYYY, hh:mmA")
}

export const getDateWithZone = (date: any = undefined) => {
  return moment(date?? new Date()).format("MM/DD/YYYY hh:mm A ZZ")
}