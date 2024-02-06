import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Background from '../components/Background';
import Btn from '../components/btn';
import { primaryColour, yellow } from '../Constant';

const Home = (props) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{ color: 'black', fontSize: 64 }}>Let's start</Text>
          <Text style={{ color: 'black', fontSize: 64 }}>Booking</Text>
          <Text style={{ color: 'black', fontSize: 64 }}>Droptaxi</Text>
          <Text style={{ color: 'black', fontSize: 64, marginBottom: 40 }}>B2B</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Btn bgColor={primaryColour} textColor="black" btnLabel="Login" Press={() => props.navigation.navigate('Login')} />
          <Btn bgColor={primaryColour} textColor="black" btnLabel="Signup" Press={() => props.navigation.navigate('Signup')} />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
    marginVertical: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent:"center"
  },
  buttonContainer: {
    marginTop: 40, // Adjust as needed
  },
});

export default Home;
