import { getDataArray, getDataObject, getDataObjectFromArray, getDateWithZone } from "../utils/FirestoreDataUtils";
import { firebase_app } from "../config/firbaseApp"
const firestore = firebase_app.firestore()

export const $get = async (collection: string, params: any = [], isOne = false, extraParams:any = {}) => {

  let query: any = firestore.collection(collection)
  let firstOrderBy
  for (var i = 0; i < params.length; i++) {
    const { field, condition = "==", value } = params[i]
    if (field) query = query.where(field, condition, value);
    if(condition == "!=" || condition == "!==") firstOrderBy = field
  }
  query = firstOrderBy? query.orderBy(firstOrderBy) : query
  query = extraParams.orderBy ? query.orderBy(extraParams.orderBy, extraParams.orderDirection) : extraParams.skip ? query.orderBy("id") : query
  query = extraParams.limit ? query.limit(extraParams.limit) : query
  query = extraParams.limit && extraParams.skip ? query.startAfter(extraParams.skip) : query

  const snapShots = await query.get()
  if (isOne) return await getDataObjectFromArray(snapShots)
  return { [collection]: await getDataArray(snapShots), skip: !snapShots.empty ? snapShots.docs[snapShots.docs.length - 1] : null }
}

// eslint-disable-next-line no-unused-vars
export const $getOne = async (collection, _id) => {
  const query = firestore.collection(collection).doc(_id)
  return await getDataObject(await query.get())
}

export const $post = async (collection, params, id = null) => {
  Object.keys(params).forEach(key => {
    if (params[key] === undefined) delete params[key]
  })

  const created_at = getDateWithZone()
  const collectionRef = firestore.collection(collection)
  const doc = id ? collectionRef.doc(id) : collectionRef.doc()
  params._id = doc.id
  params.id = doc.id
  await doc.set({ ...params, created_at, updated_at: created_at })

  return await $getOne(collection, doc.id)
};

export const $put = async (collection, _id, params) => {
  const updated_at = getDateWithZone()
  Object.keys(params).forEach(key => {
    if (params[key] === undefined) delete params[key]
  })

  const doc = firestore.collection(collection).doc(_id)
  await doc.update({ ...params, updated_at })

  const val = await $getOne(collection, _id)
  console.log(val)
  return val
};

export const $delete = async (collection, _id) => {
  return await firestore.collection(collection).doc(_id).delete()
};