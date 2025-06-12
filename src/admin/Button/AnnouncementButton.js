import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AnnouncementContext} from '../../common/Context/AnnouncementContext';
import {ColorShade} from '../../Asset/CSS_COLOR';
import {useNavigation} from '@react-navigation/native';
import {sendPushNotification} from '../../util/Backend';

const AnnouncementButton = ({data}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const {postAnnouncementHandlerCxt} = useContext(AnnouncementContext);
  function uploadAllDataFirestore() {
    setIsLoading(false);
    postAnnouncementHandlerCxt(
      data.title,
      data.description,
      data.imageUri,
      () => {
        console.log('A');

        // navigation.navigate('AdminBottomTab');
        console.log('B');
        setIsLoading(true);
      },
    );
  }
  const handleAnnouncementSubmit = () => {
    console.log('Announcement Title:', data.title);
    console.log('Announcement Description:', data.description);
    console.log('Image URI:', data.imageUri);

    if (data.title && data.description && data.imageUri)
      uploadAllDataFirestore();
    sendPushNotification(
      [
        'e1VDCLOQT-qEJD7419B5A8:APA91bEwr7UctIvp9pqpnSdE_VkOSdhdcmOGlxC8rypb4El9w7SEnYK_e4mFotDBQwCfT59LN6qLeLb4ptl_Gyf6aPXT5gFV1c3GLB6z_h14x37rXkJAe6bWR5OArk412yNh3FMoo7rI',
      ],
      `${data.description}`,
      `${data.title}`,
    );

    // You can send this data to your backend for further processing
  };
  return (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={handleAnnouncementSubmit}>
      {isLoading ? (
        <Text style={styles.submitButtonText}>Submit</Text>
      ) : (
        <ActivityIndicator color="blue" size="small" />
      )}
    </TouchableOpacity>
  );
};

export default AnnouncementButton;

const styles = StyleSheet.create({
  submitButton: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: ColorShade.buttonBackgroundColor,
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
