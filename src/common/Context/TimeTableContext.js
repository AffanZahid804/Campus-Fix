import {
  postTimeTableHandler,
  fetchTimeTableHandler,
  deleteTimeTableHandler, // Import the delete handler function
} from '../util/TimeTableFirebase';
import createDataContext from './createDataContext';
import uuid from 'react-native-uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'post_timetable':
      return [
        ...state,
        {
          sapID: action.payload.sapID,
          semester: action.payload.semester,
          section: action.payload.section,
          courseCode: action.payload.courseCode,
          time: action.payload.time,
          subject: action.payload.subject,
          instructor: action.payload.instructor,
          day: action.payload.day,
          uniqueId: action.payload.uniqueId,
        },
      ];

    case 'get_timetables':
      return action.payload;

    case 'delete_timetable':
      return state.filter(item => item.uniqueId !== action.payload.uniqueId);

    default:
      return state;
  }
};

const postTimeTableHandlerCxt = dispatch => {
  return async (
    sapID,
    semester,
    section,
    courseCode,
    time,
    subject,
    instructor,
    day,
  ) => {
    const uniqueId = uuid.v4();
    try {
      const timeTableData = {
        sapID,
        semester,
        section,
        courseCode,
        time,
        subject,
        instructor,
        day,
        uniqueId,
      };

      const postTimeTableResponse = await postTimeTableHandler(timeTableData);

      dispatch({
        type: 'post_timetable',
        payload: {
          sapID,
          semester,
          section,
          courseCode,
          time,
          subject,
          instructor,
          day,
          uniqueId,
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };
};

const getTimeTableHandlerCxt = dispatch => {
  return async () => {
    try {
      const timeTablesResponse = await fetchTimeTableHandler();
      dispatch({type: 'get_timetables', payload: timeTablesResponse});
    } catch (error) {
      console.log('getTimeTableHandlerCxt Error: ', error);
    }
  };
};

const deleteTimeTableHandlerCxt = dispatch => {
  return async (uniqueId, id) => {
    try {
      await deleteTimeTableHandler(uniqueId, id); // Call the delete handler function
      console.log('Delete 1 : ', uniqueId, id);
      dispatch({
        type: 'delete_timetable',
        payload: {
          uniqueId,
          id,
        },
      });
    } catch (error) {
      console.log('deleteTimeTableHandlerCxt Error: ', error);
    }
  };
};

export const {Context: TimeTableContext, Provider: TimeTableProvider} =
  createDataContext(
    reducer,
    {
      postTimeTableHandlerCxt,
      getTimeTableHandlerCxt,
      deleteTimeTableHandlerCxt, // Include the delete handler in the context
    },
    [],
  );
