import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ExamButton = () => {
  const submit = () => {
    console.log('Submit Exam ');
  };
  return <Button title="Submit" onPress={submit} />;
};

export default ExamButton;

const styles = StyleSheet.create({});
