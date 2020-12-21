import { createStore } from 'redux';
import { createSelector } from 'reselect'

const usersSelector = (state) => state.users;


export const getIsSignedIn = createSelector(
   [usersSelector],
   state => state.uid
)

export const getUserId = createSelector(
   [usersSelector],
   state => state.isSignedIn
)

export const getUsername = createSelector(
   [usersSelector],
   state => state.username
)