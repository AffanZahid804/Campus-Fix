import {
  postMakeupClassHandler,
  fetchMakeupClassesHandler,
  updateMakeupClassHandler,
  deleteMakeupClassHandler,
} from '../util/MakeupClassFirebase';
import createDataContext from './createDataContext';
import uuid from 'react-native-uuid';
const reducer = (state, action) => {
  switch (action.type) {
    case 'post_makeupclass':
      return [
        ...state,
        {
          ...action.payload,
        },
      ];

    case 'get_makeupclasses':
      return action.payload;

    case 'update_makeupclass':
      console.log('Payload:', action.payload);
      console.log('State before update:', state);
      const updatedState = state.map(makeupClass =>
        makeupClass.UniqueId === action.payload.uniqueId
          ? {...makeupClass, Status: action.payload.Status}
          : makeupClass,
      );
      console.log('State after update:', updatedState);
      return updatedState;
    case 'delete_makeupclass':
      return state.filter(
        makeupClass => makeupClass.UniqueId !== action.payload.uniqueId,
      );

    default:
      return state;
  }
};

const postMakeupClassHandlerCxt = dispatch => {
  return async (
    name,
    email,
    day,
    subject,
    startTime,
    endTime,
    courseCode,
    section,
    semester,
    status,
    token,
  ) => {
    try {
      const uniqueId = uuid.v4();

      const makeupClassData = {
        name,
        email,
        day,
        subject,
        startTime,
        endTime,
        courseCode,
        section,
        semester,
        status,
        uniqueId,
        token,
      };
      const postMakeupClassResponse = await postMakeupClassHandler(
        makeupClassData,
      );

      dispatch({
        type: 'post_makeupclass',
        payload: makeupClassData,
      });
    } catch (error) {
      console.log('postMakeupClassHandlerCxt Error: ', error);
    }
  };
};

const updateMakeupClassHandlerCxt = dispatch => {
  return async (uniqueId, Status, id) => {
    try {
      const updateMakeupClassResponse = await updateMakeupClassHandler(
        uniqueId,
        Status,
        id,
      );

      dispatch({
        type: 'update_makeupclass',
        payload: {
          uniqueId,
          Status,
          id,
        },
      });
    } catch (error) {
      console.log('updateMakeupClassHandlerCxt Error: ', error);
    }
  };
};
const deleteMakeupClassHandlerCxt = dispatch => {
  return async (uniqueId, id) => {
    try {
      await deleteMakeupClassHandler(uniqueId, id);

      dispatch({
        type: 'delete_makeupclass',
        payload: {
          uniqueId,
        },
      });

      console.log('Delete dispatched!');
    } catch (error) {
      console.log('deleteMakeupClassHandlerCxt Error: ', error);
    }
  };
};

const getMakeupClassesHandlerCxt = dispatch => {
  return async () => {
    try {
      const makeupClassesResponse = await fetchMakeupClassesHandler();
      dispatch({type: 'get_makeupclasses', payload: makeupClassesResponse});
    } catch (error) {
      console.log('getMakeupClassesHandlerCxt Error: ', error);
    }
  };
};

export const {Context: MakeupClassContext, Provider: MakeupClassProvider} =
  createDataContext(
    reducer,
    {
      postMakeupClassHandlerCxt,
      updateMakeupClassHandlerCxt,
      deleteMakeupClassHandlerCxt,
      getMakeupClassesHandlerCxt,
    },
    [],
  );
