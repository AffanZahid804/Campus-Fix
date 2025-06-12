import {createContext} from 'react';
import createDataContext from './createDataContext';
import {
  postComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaint,
} from '../util/ComplaintFirebase'; // Import your Firebase functions for complaints
import uuid from 'react-native-uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'post_complaint':
      return [
        ...state,
        {
          room: action.payload.room,
          description: action.payload.description,
          status: action.payload.status,
          imageUri: action.payload.imageUri,
          id: uuid.v4(), // Generate a unique ID for the complaint
        },
      ];
    case 'get_complaint':
      return action.payload;

    case 'update_complaint':
      return state.map(complaint =>
        complaint.id === action.payload.id
          ? {...complaint, status: action.payload.status}
          : complaint,
      );
    case 'delete_complaint':
      return state.filter(complaint => complaint.id !== action.payload.id);
    default:
      return state;
  }
};

const postComplaintContext = dispatch => {
  return async (room, description, status, imageUri, callback) => {
    try {
      // Call your Firebase function to post a new complaint
      const uniqueId = uuid.v4();

      await postComplaint(
        room,
        description,
        status,
        imageUri,
        uniqueId,
        callback,
      );

      dispatch({
        type: 'post_complaint',
        payload: {
          room,
          description,
          status,
          imageUri,
          uniqueId,
        },
      });
    } catch (error) {
      console.log('Error posting complaint:', error);
    }
  };
};

const updateComplaintContext = dispatch => {
  return async (id, status) => {
    try {
      // Call your Firebase function to update the complaint status
      await updateComplaint(id, status);

      dispatch({
        type: 'update_complaint',
        payload: {
          id,
          status,
        },
      });
    } catch (error) {
      console.log('Error updating complaint:', error);
    }
  };
};

const deleteComplaintContext = dispatch => {
  return async id => {
    try {
      // Call your Firebase function to delete the complaint
      await deleteComplaint(id);

      dispatch({
        type: 'delete_complaint',
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log('Error deleting complaint:', error);
    }
  };
};

const getComplaintHandlerCxt = dispatch => {
  return async () => {
    try {
      const complaintResponse = await getComplaint();
      dispatch({type: 'get_complaint', payload: complaintResponse});
    } catch (error) {
      console.log('getComplaintHandlerCxt Error: ', error);
    }
  };
};

export const {Context: ComplaintContext, Provider: ComplaintProvider} =
  createDataContext(
    reducer,
    {
      postComplaintContext,
      updateComplaintContext,
      deleteComplaintContext,
      getComplaintHandlerCxt,
    },
    [],
  );
