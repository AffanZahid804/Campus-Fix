import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ColorShade} from '../../Asset/CSS_COLOR';
import {ComplaintContext} from '../../common/Context/ComplaintContext';
import {sendPushNotification} from '../../util/Backend';
import {NotificationContext} from '../../common/Context/NotificationContext';
const ComplaintButton = ({data}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const {postComplaintContext} = useContext(ComplaintContext);
  const {postNotificationHandlerCxt} = useContext(NotificationContext);

  const handleComplaintSubmit = () => {
    if (data.room && data.description) {
      setIsLoading(false);
      postComplaintContext(
        data.room,
        data.description,
        data.status,
        data.imageUri,
        () => {
          setIsLoading(true);
          navigation.navigate('TeacherBottomTab');
        },
      );
      postNotificationHandlerCxt(data.room, data.description, data.imageUri);
//admin - > 6a - > 
      sendPushNotification(
        [
          'e1VDCLOQT-qEJD7419B5A8:APA91bEwr7UctIvp9pqpnSdE_VkOSdhdcmOGlxC8rypb4El9w7SEnYK_e4mFotDBQwCfT59LN6qLeLb4ptl_Gyf6aPXT5gFV1c3GLB6z_h14x37rXkJAe6bWR5OArk412yNh3FMoo7rI',
        ],
        `${data.room} ${data.description}`,
        `Complaint`,
      );
    }
  };
  return (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={handleComplaintSubmit}>
      {isLoading ? (
        <Text style={styles.submitButtonText}>Submit</Text>
      ) : (
        <ActivityIndicator color="blue" size="small" />
      )}
    </TouchableOpacity>
  );
};

export default ComplaintButton;

const styles = StyleSheet.create({
  submitButton: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: ColorShade.buttonBackgroundColor,  //register complaint 'submit button' color
    borderRadius: 25,
    // marginBottom: 10,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    width: '50%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
