import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {fontStyle, ColorShade} from '../../Asset/CSS_COLOR';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {NotificationContext} from '../../common/Context/NotificationContext';

const NotificationPage_admin = () => {
  const navigation = useNavigation();
  const {state: NotifcationState} = useContext(NotificationContext);
  const [expandedStates, setExpandedStates] = useState(
    new Array(NotifcationState.length).fill(false),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const toggleItem = index => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  const openImageFullScreen = imageUrl => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const closeImageFullScreen = () => {
    setModalVisible(false);
    setSelectedImageUrl('');
  };

  const navigationHandler = () => {
    navigation.navigate('Notification_admin');
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.EventContainer}
      onPress={() => toggleItem(index)}>
      <Pressable
        style={styles.imageContainer}
        onPress={() => openImageFullScreen(item.image)}>
        <View style={styles.cardContainer}>
          {item.image ? (
            <View style={styles.cardWrapper}>
              <Image style={styles.card} source={{uri: item.image}} />
            </View>
          ) : (
            <View style={styles.cardWrapper}>
              <Image
                style={styles.card}
                source={require('../../Asset/Icon/no_image.jpg')}
              />
            </View>
          )}
        </View>
      </Pressable>
      <View style={styles.titleMsgContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{item.room}</Text>
          <Text
            numberOfLines={expandedStates[index] ? undefined : 4}
            style={styles.description}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.nameContainerStyle}>
        <Text style={styles.nameStyle}>Notification</Text>
      </View>
      <LinearGradient
        colors={['#ffff', '#512da8', '#ffff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      />

      <FlatList
        data={NotifcationState}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={styles.contentContainer}
      />

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
    flex: 1,
  },
  nameContainerStyle: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  nameStyle: {
    fontFamily: fontStyle.SFNSDisplayBold,
    fontSize: 30,
    paddingLeft: 25,
    color: '#000',
    fontWeight: 'bold',
  },
  TextStyle: {
    fontFamily: fontStyle.SFNSDisplayBold,
    fontSize: 18,
    paddingLeft: 25,
    color: '#000',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  EventContainer: {
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: ColorShade.borderColor,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    padding: 10,
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
  iconStyle: {
    height: 35,
    width: 35,
    marginLeft: '45%',
  },
});

export default NotificationPage_admin;
