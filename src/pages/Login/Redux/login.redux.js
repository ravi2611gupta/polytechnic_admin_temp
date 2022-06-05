import { auth } from "../../../firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";

export const AUTH_START = "AUTH_START";
export const AUTH_END = "AUTH_END";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";


export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";


//initial State

const initialState = {
  loggedIn: false,
  user: sessionStorage.getItem('gp-user')
  ? sessionStorage.getItem('gp-user')
  : null,
  error: null,
  loading: false,
};

export const signIn = (data) => async (dispatch) => {
    dispatch({type:AUTH_START})
    // console.log("Login In User")
    // console.log(data);

    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);

      sessionStorage.setItem('gp-user', user.uid)

      dispatch({type:AUTH_SUCCESS,payload:user.uid})

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error)
      dispatch({type:AUTH_FAIL,payload:error.message})

    });
};


export const signOut =  (navigate)=>(dispatch)=>{
  dispatch({type:LOGOUT_START})
  sessionStorage.removeItem('gp-user');
  navigate("/", { replace: true });
}


export const loginReducer =(state = initialState,{type,payload})=>{
    switch(type){
        case AUTH_START:
            return{...state,loading:true}
        case AUTH_SUCCESS:
            return{...state,user:payload,loading:false}
        case AUTH_FAIL:
            return{...state,loading:false,error:payload}
        case LOGOUT_START:
            return{...state,user:null}
        default:
                return state;
    }

}