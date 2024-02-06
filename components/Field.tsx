import React from 'react';
import {TextInput} from 'react-native';
import {primaryColour} from '../Constant';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 12, color: "black", paddingHorizontal: 10, width: '88%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 8, height:45,fontSize:16}}
      placeholderTextColor={"grey"} selectionColor={primaryColour}></TextInput>
  );
};

export default Field;