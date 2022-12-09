import Constant from "../enum/Constant";

const AuthReducer = (state, action) => {

    switch (action.type) {
      case Constant.Login: {
        return {
            currentUser: action.payload,
        };
      }
      case Constant.Logout: {
        return {
            currentUser: null,
        };
      }
      
      default:
        return state;
    }
  };
  
  export default AuthReducer;