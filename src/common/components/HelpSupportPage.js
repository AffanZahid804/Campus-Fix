import React from 'react';
import {StyleSheet, Button, View, Text, TouchableOpacity} from 'react-native';
import email from 'react-native-email';
import {ColorShade} from '../../Asset/CSS_COLOR';

const HelpSupport = () => {
  const handleEmail = () => {
    const to = ['abdul.ghaffar@cs.uol.edu.pk', 'foo@bar.com']; // string or array of email addresses
    email(to, {
      subject: 'Show how to use',
      body: 'Some body right here',
      checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>University of Lahore </Text>
      <Text style={styles.subtitle}>HelpSupport</Text>
      <Text style={styles.description}>
        If you need any assistance, feel free to contact us via email.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleEmail}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    // marginHorizontal: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
});

export default HelpSupport;
