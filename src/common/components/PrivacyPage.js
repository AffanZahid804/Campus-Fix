import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const PrivacyPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>

      <Text style={styles.boldText}>Introduction</Text>
      <Text style={styles.paragraph}>
        At The University of Lahore, accessible from uol.edu.pk, the privacy of
        our visitors is of utmost importance to us. This Privacy Policy document
        outlines the types of information that are collected and recorded by The
        University of Lahore and how we use it.
      </Text>

      <Text style={styles.boldText}>GDPR Compliance</Text>
      <Text style={styles.paragraph}>
        The University of Lahore is committed to complying with the General Data
        Protection Regulation (GDPR) for all users, including those in the
        European Economic Area (EEA).
      </Text>

      <Text style={styles.boldText}>Log Files</Text>
      <Text style={styles.paragraph}>
        Like many websites, The University of Lahore utilizes log files. These
        files log visitors when they visit websites. The information collected
        includes IP addresses, browser types, ISP details, date and time stamps,
        referring/exit pages, and click counts. This data is used for analytical
        purposes and to improve user experience.
      </Text>

      <Text style={styles.boldText}>Cookies and Web Beacons</Text>
      <Text style={styles.paragraph}>
        Our website uses cookies to store information about visitors'
        preferences and to customize web page content based on browser type and
        other information. Cookies help us enhance user experience by optimizing
        our website's content.
      </Text>

      {/* Include other sections as per your Privacy Policy */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 15,
  },
});

export default PrivacyPage;
