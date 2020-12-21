import {
   createStore as reduxCreateStore,
   combineReducers,
   applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger/src';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { ProductsReducer } from '../products/reducers';
import { UserReducer } from '../users/reducers';

// history... どこのURLにいたのかなどの情報を持っている。
export default function createStore(history) {
   const logger = createLogger({
      collapsed: true,
      diff: true
   })

   return reduxCreateStore(
      combineReducers({
         products: ProductsReducer,
         router: connectRouter(history),
         users: UserReducer
      }),
      applyMiddleware(
         routerMiddleware(history),
         thunk
      )
   )
}