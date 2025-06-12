import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ColorShade} from '../../Asset/CSS_COLOR';

const CustomAlert = ({message, onClose}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    minHeight: 150, // Set a minimum height for the alert container
  },
  message: {
    fontSize: 16,
    color: ColorShade.textColor,
    marginBottom: 10,
    textAlign: 'center', // Center the text horizontally
  },
  closeButton: {
    backgroundColor: ColorShade.buttonBackgroundColor,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default CustomAlert;
