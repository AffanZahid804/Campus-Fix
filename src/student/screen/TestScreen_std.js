import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet ,Dimensions} from 'react-native';

// const ScreenWidth =  // Define your screen width here;

const ScreenWidth = Dimensions.get('window').width;

const TestScreen_std = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login button pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../Asset/Wallpaper/1.jpg')} style={styles.logoImageStyle} />

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.emailTextInputContainer}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.passwordTextInputContainer}>
        <TextInput
          style={styles.emailTextInputContainer}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {/* Add eye icon for password visibility */}
      </View>

      <TouchableOpacity style={styles.loginButtonStyle} onPress={handleLogin}>
        <Text style={styles.loginTextStyle}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerStyle} />

      <TouchableOpacity style={styles.signupStyle}>
        <Text style={styles.signupTextStyle}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      <View style={styles.socialLoginContainer}>
        {/* Add social login buttons */}
      </View>

      <View style={styles.eyeIconContainer}>
        {/* Add eye icon for password visibility */}
      </View>

      {/* Display error message (shakeText) if login fails */}
      {false && <Text style={styles.shakeText}>Invalid email or password</Text>}

      {/* Add email and password tooltips for additional information */}
      <View style={styles.emailTooltipContainer}>
        {/* Add email tooltip */}
      </View>

      <View style={styles.passwordTooltipContainer}>
        {/* Add password tooltip */}
      </View>
    </ScrollView>
  );
};

export default TestScreen_std;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  logoImageStyle: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  textInputContainer: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordTextInputContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonStyle: {
    height: 40,
    width: ScreenWidth * 0.9,
    backgroundColor: "#25a9e2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 32,
    elevation: 5,
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: "#166080",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  loginTextStyle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupStyle: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextStyle: {
    color: "#acabb0",
  },
  dividerStyle: {
    height: 0.5,
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 16,
    width: ScreenWidth * 0.8,
    alignSelf: "center",
    backgroundColor: "#ccc",
  },
  socialLoginContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  // ... Other styles

  // Add the rest of your styles here
});