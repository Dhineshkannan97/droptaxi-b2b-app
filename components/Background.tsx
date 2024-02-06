import React from 'react';
import {View, ImageBackground} from 'react-native';

const Background = ({ children }) => {
  return (
        <View style={{ shadowColor: '#000', shadowOpacity: 0.9, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 }}>
      <ImageBackground source={require("../assets/background1.png")} style={{ height: '100%',backgroundColor: 'rgba(0, 0, 0, 0.3)' , opacity: 0.5 }} />
      <View style={{ position: "absolute" }}>
        {children}
      </View>
    </View>
  );
}

export default Background;