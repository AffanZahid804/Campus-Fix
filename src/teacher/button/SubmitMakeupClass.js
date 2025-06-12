import React, {useContext, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import CustomAlert from './CustomAlert'; // Import the custom alert component
import {ColorShade} from '../../Asset/CSS_COLOR';
import {MakeupClassContext} from '../../common/Context/MakeupClassContext';
import {sendPushNotification} from '../../util/Backend';

const SubmitMakeupClass = ({data}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {postMakeupClassHandlerCxt} = useContext(MakeupClassContext);

  const handleSubmit = () => {
    // Regular expressions for validation
    const dayRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/; // Matches format mm-dd-yyyy

    const timeRegex = /^\d{2}:\d{2}$/; // Matches format hh:mm
    const semesterRegex = /^(0*[1-8])$/; // Matches semester 1 to 8
    const sectionRegex = /^[a-zA-Z]$/; // Matches section A to Z

    // Validate form fields
    if (!dayRegex.test(data.day)) {
      setAlertMessage('Invalid day format. Please use dd-mm-yy format.');
      setShowAlert(true);
      return;
    }

    if (!timeRegex.test(data.startTime) || !timeRegex.test(data.endTime)) {
      setAlertMessage('Invalid time format. Please use hh:mm format.');
      setShowAlert(true);
      return;
    }

    if (!semesterRegex.test(data.semester)) {
      setAlertMessage('Invalid semester. Please use a number between 1 and 8.');
      setShowAlert(true);
      return;
    }

    if (!sectionRegex.test(data.section)) {
      setAlertMessage(
        'Invalid section. Please use a single letter between A and Z.',
      );
      setShowAlert(true);
      return;
    }

    if (
      data.semester === '9' ||
      data.semester === '0' ||
      data.semester === '11'
    ) {
      setAlertMessage('Invalid semester. Please use a number between 1 and 8.');
      setShowAlert(true);
      return;
    }

    if (data.section === 'AA' || data.section === 'AB') {
      setAlertMessage('Invalid section. Section AA and AB are not allowed.');
      setShowAlert(true);
      return;
    }

    if (!data.subject || !data.courseCode || !data.section || !data.semester) {
      setAlertMessage('All fields are required.');
      setShowAlert(true);
      return;
    }

    // Handle form submission logic here
    console.log('Form submitted:', data);
    postMakeupClassHandlerCxt(
      data.name,
      data.email,
      data.day,
      data.subject,
      data.startTime,
      data.endTime,
      data.courseCode,
      data.section,
      data.semester,
      data.status,
      data.token,
    );

    sendPushNotification(
      [
        'e1VDCLOQT-qEJD7419B5A8:APA91bEwr7UctIvp9pqpnSdE_VkOSdhdcmOGlxC8rypb4El9w7SEnYK_e4mFotDBQwCfT59LN6qLeLb4ptl_Gyf6aPXT5gFV1c3GLB6z_h14x37rXkJAe6bWR5OArk412yNh3FMoo7rI',
      ],
      `Semster : ${data.semester} Section : ${data.section} Time : (${data.startTime}-${data.endTime}) Detail : (${data.name}-${data.courseCode})`,
      `Makeup Class`,
    );
  };

  return (
    <>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <TouchableOpacity style={styles.container} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: ColorShade.buttonBackgroundColor, // submit button color
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
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default SubmitMakeupClass;
