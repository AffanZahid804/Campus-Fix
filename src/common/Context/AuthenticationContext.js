import {
  postSignUpHandler,
  fetchLoginHandler,
} from '../util/AuthenticationFirebase';
import createDataContext from './createDataContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'post_data':
      return [
        ...state,
        {
          FirstName: action.payload.firstName,
          LastName: action.payload.lastName,
          Email: action.payload.Email,
          Password: action.payload.Password,
          ConfirmPassword: action.payload.confirmPassword,
          Department: action.payload.Password,
        },
      ];

    case 'get_data':
      return action.payload;
    default:
      return state;
  }
};
const postSignUpHandlerCxt = dispatch => {
  return async (
    firstName,
    lastName,
    Email,
    Password,
    confirmPassword,
    Department,
    Token,
    callBack,
    ErrorMessage,
  ) => {
    try {
      const signUpData = {
        firstName,
        lastName,
        Email,
        Password,
        confirmPassword,
        Department,
        Token,
      };

      // console.log("Signupdata AuthContext : ",signUpData);
      const postans = await postSignUpHandler(
        signUpData,
        callBack,
        ErrorMessage,
      );

      dispatch({
        type: 'post_data',
        payload: {
          firstName,
          lastName,
          Email,
          Password,
          confirmPassword,
          Department,
          Token,
        },
      });
    } catch (error) {
      console.log('postSignUpHandlerCxt Error : ', error);
    }
  };
};

const getLogInHandlerCxt = dispatch => {
  return async () => {
    try {
      const response = await fetchLoginHandler();
      // console.log("Response getlogCtx : ",response);

      dispatch({type: 'get_data', payload: response});
    } catch (error) {
      console.log('loginHandlerCtx : ', error);
    }
  };
};

export const {
  Context: AuthenticationContext,
  Provider: AuthenticationProvider,
} = createDataContext(reducer, {postSignUpHandlerCxt, getLogInHandlerCxt}, []);
