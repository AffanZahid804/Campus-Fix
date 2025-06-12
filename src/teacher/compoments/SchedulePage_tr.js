import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {fontStyle} from '../../Asset/CSS_COLOR';
import MakeupItemPage from '../../student/components/MakeupItemPage';
import ExamItemPage from '../../student/components/ExamItemPage';
import ClassItemPage from '../../student/components/ClassItemPage';

const SchedulePage_tr = () => {
  const [index, setIndex] = useState(0);

  const onIndexChanged = newIndex => {
    setIndex(newIndex);
  };

  const getTitle = () => {
    switch (index) {
      case 0:
        return 'Class';
      case 1:
        return 'Makeup';
      case 2:
        return 'Exam';
      default:
        return 'Class Schedule';
    }
  };

  return (
    <View style={styles.Schedulecontainer}>
      {/* Second Row: Class Schedule and Exam Schedule */}
      <LinearGradient
        colors={['#512da8', '#673ab7']}
        style={styles.MainEventContainer}>
        <View style={[styles.title]}>
          <Text style={styles.title}>Schedule</Text>
        </View>
        {/* Class Schedule */}
        <TouchableOpacity onPress={() => setIndex(0)}>
          <View style={styles.subsectionItem}>
            <MaterialIcons name="library-books" size={24} color="black" />
            <Text style={[styles.titleStyle, {marginTop: 12}]}>
              {getTitle()}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.titleStyle, {fontSize: 17}]}>Upcoming {getTitle()}</Text>
        <Text style={[styles.titleStyle, {fontSize: 17}]}>26/06/2024</Text>
      </LinearGradient>
        {/* upcoming class /makeup class/exam     */}
      {/* Render swipeable container */}
      <Swiper
        loop={false}
        index={index}
        onIndexChanged={onIndexChanged}
        showsButtons={false}
        showsPagination={false}
        style={styles.swiperContainer}>
        <ClassItemPage />
        <MakeupItemPage />
        <ExamItemPage />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  Schedulecontainer: {
    // backgroundColor: '#ffffff',
    // paddingHorizontal: 10,
    // flex:1
    // flexGrow:1,
    // borderColor: 'blue',
    // borderWidth: 2,
    height: '100%',
    width: '100%',
  },
  swiperContainer: {
    // flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    // backgroundColor: 'red',
    // height: 100,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  subsection: {
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subsectionClassExam: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subsectionItem: {
    // flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,
  },
  titleStyle: {
    fontSize: 20,
    // fontWeight:"700",
    // marginTop:10,
    fontFamily: fontStyle.SFNSDisplayBold,
    color: '#ffff',
  },
  icon: {
    marginRight: 10,
  },

  MainEventContainer: {
    // marginTop: 5,
    paddingHorizontal: 20,
    // borderWidth: 2,
    // borderColor: 'red',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 10,
    // backgroundColor: '#ffffff',
    // shadowColor: '#000',
    // shadowOpacity: 0.3,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 4,
    // elevation: 5,
    // marginBottom: 5,
    // width:"100%"
  },
  title: {
    color: '#ffff',
    fontSize: 30,
    // marginLeft: 10,
    // fontWeight: '700',
    fontFamily: fontStyle.SFNSDisplayHeavy,
    // alignSelf:"center"
    marginLeft: '1.5%',
  },
  ClassExamContainer: {
    // borderColor:"red",
    // borderWidth:2,
    flex: 1,
    width: '100%',
    // borderRadius:30
    // borderTopLeftRadius:-30
  },
});

export default SchedulePage_tr;
