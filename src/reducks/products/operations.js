import { db, FirebaseTimeStamp } from "../../firebase"
import { push } from 'connected-react-router'

const productsRef = db.collection('products')

export const saveProducts = (id, name, description, category, gender, price, images, sizes) => {
   return async (dispatch) => {
      const timeStamp = FirebaseTimeStamp.now();

      const data = {
         category: category,
         description: description,
         gender: gender,
         images: images,
         name: name,
         price: parseInt(price, 10),
         sizes: sizes,
         updated_at: timeStamp
      }

      if(id === "") {
         const ref = productsRef.doc()
         // const id = ref.id
         id = ref.id
         data.id = id
         data.create_at = timeStamp
      }

      return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
               dispatch(push('/'))
            }).catch((error) => {
               throw new Error(error);
            })
   }
}