import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, ScrollView } from 'react-native';
import { ColorShade } from '../../Asset/CSS_COLOR';

const DetailEventPage_std = ({ data }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      scaleAnim,
      {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }
    ).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <ScrollView style={styles.scrollView}>
      <Image source={data.image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.message}>{data.message}</Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: "10%",
    // backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // No horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Android shadow elevation
    // marginHorizontal: "5%",
    borderRadius: 10
  },
  scrollView: {
    flexGrow:1,
    // flex:1,

    width: '100%',
  },
  image: {
    width: '100%',
    height: 300, // Adjust height as needed
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorShade.titleColor,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: "5%"
  },
});

export default DetailEventPage_std;
