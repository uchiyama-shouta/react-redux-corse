// アプリに必要なstateを全て
const initialState = {
   products: {
      list: []
   },
   users: {
      isSignedIn: false,
      role: '',
      uid: '',
      username: ''
   }
}

export default initialState;