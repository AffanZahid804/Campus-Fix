import {
  postAnnouncementHandler,
  fetchAnnouncementHandler,
} from '../util/AnnouncementFirebase';
import createDataContext from './createDataContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'post_announcement':
      return [
        ...state,
        {
          title: action.payload.title,
          description: action.payload.description,
          imageUrl: action.payload.imageUrl,
        },
      ];

    case 'get_announcements':
      return action.payload;

    default:
      return state;
  }
};

const postAnnouncementHandlerCxt = dispatch => {
  return async (title, description, imageUrl, callBack) => {
    try {
      const announcementData = {
        title,
        description,
        imageUrl,
        callBack,
      };

      // console.log("Announcement Data: ", announcementData);
      const postAnnouncementResponse = await postAnnouncementHandler(
        announcementData,
        callBack,
      );

      dispatch({
        type: 'post_announcement',
        payload: {
          title,
          description,
          imageUrl,
        },
      });
    } catch (error) {
      console.log('postAnnouncementHandlerCxt Error: ', error);
    }
  };
};

const getAnnouncementHandlerCxt = dispatch => {
  return async () => {
    try {
      const announcementsResponse = await fetchAnnouncementHandler();
      // console.log("Announcements Response: ", announcementsResponse);

      dispatch({type: 'get_announcements', payload: announcementsResponse});
    } catch (error) {
      console.log('getAnnouncementHandlerCxt Error: ', error);
    }
  };
};

export const {Context: AnnouncementContext, Provider: AnnouncementProvider} =
  createDataContext(
    reducer,
    {postAnnouncementHandlerCxt, getAnnouncementHandlerCxt},
    [],
  );
