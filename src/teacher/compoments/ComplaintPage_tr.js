import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ColorShade} from '../../Asset/CSS_COLOR';
import storage from '@react-native-firebase/storage';

import ComplaintButton from '../button/ComplaintButton';
import {launchImageLibrary} from 'react-native-image-picker';
const ComplaintPage_tr = () => {
  const [room, setroom] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('New');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        setLoading(true);

        const {uri, fileName} = response.assets[0];
        const imageFileName =
          fileName || uri.substring(uri.lastIndexOf('/') + 1);

        const reference = storage().ref(`images/${imageFileName}`);
        const task = reference.putFile(uri);

        task.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          error => {
            console.error('Error uploading image to Firebase Storage:', error);
            setLoading(false);
          },
          async () => {
            const downloadURL = await reference.getDownloadURL();
            console.log('Image uploaded to Firebase Storage:', downloadURL);
            setImageUri(downloadURL);
            setLoading(false);
          },
        );
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerroom}>
        <Text style={styles.room}>Register a complaint</Text>
      </View>
      {imageUri && (
        <Image source={{uri: imageUri}} style={styles.uploadedImage} />
      )}

      {loading && (
        <ActivityIndicator
          size="large"
          color="#3498db"
          style={styles.loadingIndicator}
        />
      )}

      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={handleImageUpload}>
        <Text style={styles.imageUploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Room No"
          value={room}
          onChangeText={text => setroom(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {height: 100}]}
          placeholder="Complaint Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>

      <ComplaintButton data={{room, description, status, imageUri}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
  containerroom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  room: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
    textAlign: 'center',
    marginTop: 20,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  loadingIndicator: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: ColorShade.borderColor,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',
  },
  input: {
    width: '100%',
    paddingLeft: 10,
  },
  imageUploadButton: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: ColorShade.buttonBackgroundColor,// upload image button 
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
    marginBottom: 20,
    width: '50%',
  },
  imageUploadButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ComplaintPage_tr;
