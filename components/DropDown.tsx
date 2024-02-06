import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { View, StyleSheet, Text } from 'react-native';

type Prop = {
  data: any;
  labelField: string;
  valueField: any;
  onChangeText: any | null;
  onChange: any;
  placeholder: any;
  value?: any | null;
  search?:any | null;
};

const DropdownComponent = ({ data, labelField, valueField, onChangeText,value, onChange, placeholder,search }: Prop) => {

  const [filteredData, setFilteredData] = useState(data);
  const handleFilter = (text) => {
    const filteredItems = data.filter(item => item[labelField].startsWith(text));
    setFilteredData(filteredItems);
  };

  useEffect(() => {
    // This useEffect will be triggered when the component is rendered or when the data prop changes
    setFilteredData(data);
  }, [data]);

  return (

    <View style={styles.container}>
      <Dropdown
        data={filteredData}
        onChangeText={(text) => {
          handleFilter(text);
          onChangeText(text);
        }}
        placeholderStyle={styles.placeholderStyle}
        labelField={labelField}
        valueField={valueField}
        onChange={onChange}
        placeholder={placeholder}
        style={styles.dropdown}
        value={value}
        search={search}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '88%',
    marginVertical: 8,
    position: 'relative',
  },
  dropdown: {
    borderRadius: 12,
    backgroundColor: 'rgb(220, 220, 220)',
    height: 45,
    paddingLeft: 12,
    paddingRight:8
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholder: {
    color: 'grey',
  },
  label: {
    fontSize: 14, // Adjust the font size as needed
  },
  placeholderStyle: {
    fontSize: 16,
    color:"grey" // Adjust the font size as needed
  },
  selectedTextStyle: {
    fontSize: 14, // Adjust the font size as needed
  },
});

export default DropdownComponent;
