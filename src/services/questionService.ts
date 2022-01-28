import { $get } from "./firestoreService"


const collection = 'questionsDb'

export const getAllQuestions = async () => { // we can introduce params for pagination
  const data =  await $get(collection)
  return data[collection]
}
