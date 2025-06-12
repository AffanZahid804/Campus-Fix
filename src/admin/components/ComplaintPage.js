import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';

import {ComplaintContext} from '../../common/Context/ComplaintContext';
import CompliantButton from '../Button/CompliantButton';

const ComplaintPage = () => {
  const [pressedButton, setPressedButton] = useState('New');
  const {state: complaintState, deleteComplaintContext} =
    useContext(ComplaintContext);
  const [complaintData, setComplaintData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedStates, setExpandedStates] = useState(
    new Array(complaintState.length).fill(false),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    const getcomplaintData = () => {
      console.log('complaintState : ', complaintState);
      const filteredcomplaintData = complaintState.filter(
        item => item.status === pressedButton,
      );
      setComplaintData(filteredcomplaintData);
    };
    getcomplaintData();
  }, [complaintState, pressedButton]);

  useEffect(() => {
    setIsLoading(true);
    console.log('complaintData Data : ', complaintData);
  }, [complaintData]);

  const handleStatus = status => {
    setPressedButton(status);
  };
  const deleteHandler = item => {
    const {id} = item;

    // Show alert before deleting
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this makeup class?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Call deleteMakeupClassHandlerCxt if user confirms deletion
            deleteComplaintContext(id);
          },
        },
      ],
    );
  };
  const toggleItem = index => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  const openImageFullScreen = imageUri => {
    if (imageUri) {
      setSelectedImageUrl(imageUri);
      setModalVisible(true);
    }
  };

  const closeImageFullScreen = () => {
    setModalVisible(false);
    setSelectedImageUrl('');
  };
  const renderComplaint = ({item, index}) => {
    console.log('Item : ', item);
    return (
      <TouchableOpacity
        style={styles.EventContainer}
        onPress={() => toggleItem(index)}
        onLongPress={() => deleteHandler(item)}>
        <Pressable
          style={styles.imageContainer}
          onPress={() => openImageFullScreen(item.imageUri)}>
          {item.imageUri && item.imageUri.length > 5 ? (
            <View style={styles.cardContainer}>
              <View style={styles.cardWrapper}>
                <Image style={styles.card} source={{uri: item.imageUri}} />
              </View>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <View style={styles.cardWrapper}>
                <Image
                  style={styles.card}
                  source={require('../../Asset/Icon/new.png')}
                />
              </View>
            </View>
          )}
        </Pressable>
        <View style={styles.titleMsgContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.room}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text
              numberOfLines={expandedStates[index] ? undefined : 2}
              style={styles.description}>
              {item.description}
            </Text>
          </View>
          <View style={styles.complainButtonContainer}>
            {pressedButton == 'New' ? (
              <CompliantButton
                item={{
                  uniqueId: item.uniqueId,
                  status: 'InProgress',
                  id: item.id,
                }}
                status={pressedButton}
              />
            ) : (
              <CompliantButton
                item={{
                  uniqueId: item.uniqueId,
                  status: 'Resolved',
                  id: item.id,
                }}
                status={pressedButton}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Complaint</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            {backgroundColor: pressedButton === 'New' ? '#ffff' : '#d3d3d3'},
          ]}
          onPress={() => handleStatus('New')}>
          <Text style={styles.buttonText}>New</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor:
                pressedButton === 'InProgress' ? '#ffff' : '#d3d3d3',
            },
          ]}
          onPress={() => handleStatus('InProgress')}>
          <Text style={styles.buttonText}>InProgress</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor:
                pressedButton === 'Resolved' ? '#ffff' : '#d3d3d3',
            },
          ]}
          onPress={() => handleStatus('Resolved')}>
          <Text style={styles.buttonText}>Resolved</Text>
        </Pressable>
      </View>
      {isLoading ? (
        <FlatList
          data={complaintData} // Show only filtered data
          renderItem={renderComplaint}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeImageFullScreen}>
        <TouchableWithoutFeedback onPress={closeImageFullScreen}>
          <View style={styles.modalContainer}>
            <Image
              style={styles.fullScreenImage}
              source={{uri: selectedImageUrl}}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeImageFullScreen}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',

    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#d3d3d3',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 2,
  },
  titleSection: {
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  title: {
    fontSize: 22,
    fontFamily: fontStyle.SFNSDisplayBold,
    color: '#000',
  },
  img: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: '#d3d3d3',
    width: '32%',
    // borderColor:"red",
    // borderWidth:1
  },
  buttonText: {
    color: '#696969',
    fontSize: 14,
    fontFamily: fontStyle.SanFranciscoRegular,
    textAlign: 'center',
  },
  makeupClassContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderColor: 'red',
    borderWidth: 1,
  },
  makeupClassText: {
    fontSize: 16,
  },
  messageText: {
    color: '#696969',
    marginLeft: 10,
  },
  complainButtonContainer: {
    marginTop: '10%',
  },
  EventContainer: {
    // borderWidth: 2,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderColor: ColorShade.borderColor,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    padding: 10,
    marginHorizontal: '1%',
  },
  imageContainer: {
    height: 100,
    width: 100,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  titleMsgContainer: {
    width: '70%',
    marginLeft: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: fontStyle.SFNSDisplayBold,
  },
  messageContainer: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    overflow: 'hidden',
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ComplaintPage;
