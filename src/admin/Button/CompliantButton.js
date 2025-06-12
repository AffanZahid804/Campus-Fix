import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {ColorShade} from '../../Asset/CSS_COLOR';
import {ComplaintContext} from '../../common/Context/ComplaintContext';

const CompliantButton = ({item, status}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {updateComplaintContext} = useContext(ComplaintContext);

  function submit() {
    console.log(item);
    updateComplaintContext(item.id, item.status);

    // setIsLoading(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.Loadingcontainer}>
        {/* Render your login button and loading indicator here */}
        {/* {isLoading && (
          <ActivityIndicator
            size="large"
            color="blue"
            style={styles.loadingIndicator}
          />
        )} */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => submit()}>
        <Text style={styles.buttonText}>{status}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompliantButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    right: 0,
    width: '30%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    // marginHorizontal: 30,
    paddingVertical: 1,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,

    backgroundColor: ColorShade.buttonBackgroundColor,
    borderRadius: 25,
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
    // bottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  loadingIndicator: {
    marginBottom: 60, // Adjust the margin as needed
  },
});
