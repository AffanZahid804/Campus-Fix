import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Text styles={styles.title}>
        The University of Lahore is the largest private sector university in
        Pakistan with more than 35,000 students. It was established in 1999 and
        since then it is offering courses in the fields of Medicine & Dentistry,
        Engineering, Arts, Sciences and Social Sciences. With strong emphasis on
        balanced progress and focus on human capital, the University has grown
        to 11 faculties and 45+ departments.The quality of teaching facilities
        and research excellence have also earned UOL international recognition,
        placing it amongst the top three in Pakistan according to QS Asia World
        University Rankings 2022. The Higher Education Commission (HEC)
        recognizes the University of Lahore at its highest “W4” category of
        universities reserved for those institutions that fulfill all criterion
        of an International Quality University. The University has special focus
        on Professional and Technical Education, as it is an instrument of
        growth & development of any country’s economy. We are proud to be
        well-equipped state of the art labs in the programs of Medicine &
        Dentistry, Public Health, Electrical Engineering, Civil Engineering,
        Mechanical Engineering, Pharm-D, Nursing and Law. Strong linkages with
        the industry are of paramount importance for any higher education
        institution and the University of Lahore enjoys excellent links with
        international universities. We also have a wide range of knowledge
        sharing and human resource development programs with major
        multinationals organizations. The students at the University can avail
        excellent internship and skills development programs during the course
        of their studies.
      </Text>
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
