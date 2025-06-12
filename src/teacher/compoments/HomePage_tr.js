import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {fontStyle, ColorShade} from '../../Asset/CSS_COLOR';
import {useNavigation} from '@react-navigation/native';

import Carousel, {PaginationLight} from 'react-native-x-carousel';

import LinearGradient from 'react-native-linear-gradient';
import {DATAHomeScreen} from '../../student/components/Data';
const {width} = Dimensions.get('window');

const HomePage_tr = () => {
  const navigation = useNavigation();

  function DetailHandler(data) {
    console.log(data);
    navigation.navigate('DetailEvent_std', {data});
  }

  const renderItemImage = data => (
    <View key={data._id} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.image} />
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.EventContainer}
      onPress={() => {
        DetailHandler(item);
      }}>
      <View style={styles.imageContainer}>
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItemImage}
          data={item.bannerData}
          loop
          autoplay
        />
      </View>
      <View style={styles.titleMsgContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.message}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.nameContainerStyle}>
        <Text style={styles.nameStyle}>Hello 👋 Nadeem</Text>
      </View>
      <LinearGradient
        colors={['#ffff', '#512da8', '#ffff']} // Adjust the colors as needed
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      />
      <View style={styles.nameContainerStyle}>
        <Text style={styles.TextStyle}>Latest Update Form Campus ↓ </Text>
      </View>

      <FlatList
        data={DATAHomeScreen}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    height: 3, // Adjust height as needed
    // width: '100%',
    marginHorizontal: 10,
  },
  nameContainerStyle: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    paddingVertical: 10,
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
    backgroundColor: '#ffff',
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
  },
  titleMsgContainer: {
    // width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
    width: '75%',
  },
  title: {
    fontSize: 17,
    marginLeft: 10,
    fontFamily: fontStyle.SFNSDisplayBold,
  },
  messageContainer: {
    // width: '80%',
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  message: {
    fontSize: 14,
    paddingHorizontal: 10,
    fontFamily: fontStyle.SanFranciscoRegular,
    marginBottom: 10,
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
});

export default HomePage_tr;
