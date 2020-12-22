import { db, FirebaseTimeStamp } from "../../firebase";
import { push } from "connected-react-router";
import { deleteProductAction, fetchProductsAction } from './action'
import { useDispatch, useSelector } from 'react-redux'

const productsRef = db.collection("products");

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete().then(() => {
      const prevProducts = getState().products.list
      const nextProducts = prevProducts.filter(product => product.id !== id)
      dispatch(deleteProductAction(nextProducts))
    })
  }
}

export const fetchProduct = () => {
  return async (dispatch) => {
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList))
      });
  };
};

export const saveProducts = (
  id,
  name,
  description,
  category,
  gender,
  price,
  images,
  sizes
) => {
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
      updated_at: timeStamp,
    };

    if (id === "") {
      const ref = productsRef.doc();
      // const id = ref.id
      id = ref.id;
      data.id = id;
      data.create_at = timeStamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
