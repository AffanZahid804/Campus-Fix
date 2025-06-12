import createDataContext from './createDataContext';
import uuid from 'react-native-uuid';

import {
  postNotificationHandler,
  fetchNotificationsHandler,
  deleteNotificationHandler,
} from '../util/NotificationFirebase';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'post_notification':
      return [
        ...state,
        {
          room: action.payload.room,
          description: action.payload.description,
          image: action.payload.image,
          uniqueId: action.payload.uniqueId,
        },
      ];
    case 'get_notifications':
      return action.payload;
    case 'delete_notification':
      return state.filter(item => item.uniqueId !== action.payload.uniqueId);
    default:
      return state;
  }
};

const postNotificationHandlerCxt = dispatch => {
  return async (room, description, image) => {
    const uniqueId = uuid.v4();
    try {
      const notificationData = {
        room,
        description,
        image,
        uniqueId,
      };

      await postNotificationHandler(notificationData);

      dispatch({
        type: 'post_notification',
        payload: notificationData,
      });
    } catch (error) {
      console.log('Error posting notification:', error);
    }
  };
};

const getNotificationsHandlerCxt = dispatch => {
  return async () => {
    try {
      const notifications = await fetchNotificationsHandler();
      dispatch({type: 'get_notifications', payload: notifications});
    } catch (error) {
      console.log('Error fetching notifications:', error);
    }
  };
};

const deleteNotificationHandlerCxt = dispatch => {
  return async uniqueId => {
    try {
      await deleteNotificationHandler(uniqueId);

      dispatch({
        type: 'delete_notification',
        payload: {uniqueId},
      });
    } catch (error) {
      console.log('Error deleting notification:', error);
    }
  };
};

export const {Context: NotificationContext, Provider: NotificationProvider} =
  createDataContext(
    notificationReducer,
    {
      postNotificationHandlerCxt,
      getNotificationsHandlerCxt,
      deleteNotificationHandlerCxt,
    },
    [],
  );
