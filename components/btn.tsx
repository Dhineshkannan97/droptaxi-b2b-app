import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
type BtnProps = {
  bgColor: string;
  btnLabel: string;
  textColor: string;
  Press: () => void;
  customWidth?: number;
  customHeight?: number;
};
export default function Btn({bgColor, btnLabel, textColor, Press}) {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
  return (
    <TouchableOpacity
    onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: width-180,
        height:45,
        paddingVertical: 5,
        marginVertical: 10
      }}>
      <Text style={{color: textColor, fontSize: 25, fontWeight: 'bold',alignItems:"center"}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}