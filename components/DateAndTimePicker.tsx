import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { primaryColour } from '../Constant';
import React, { useState } from "react";

type Prop = {
  date: Date | null | undefined;
  time: Date | null;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: Date) => void;
};

export const DateTimePicker = ({
  date,
  time,
  onDateChange,
  onTimeChange,
}: Prop) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange_event = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    onDateChange(currentDate);
    setShowTimePicker(true);
  };

  const onTimeChange_event = (event: any, selectedTime: any) => {
    setShowTimePicker(Platform.OS === "ios");
    setShowDatePicker(false);
    if (selectedTime) {
      time = selectedTime;
      onTimeChange(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.dropdown}
        onPress={() => setShowDatePicker(true)}
      >
        <View style={styles.placeholderContainer}>
          <Text style={[
    styles.placeholder,
    { color: !date ? "grey" : "black" } // Dynamically set the color
  ]}>
            {!date
            ? "Select Date & Time"
            : `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`} {
                showTimePicker || !time
                  ? ""
                  : ` ${time.toLocaleTimeString("en-US", {
                      timeZone: "Asia/Calcutta",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    })}`
              }
          </Text>
        </View>
      </Pressable>

<View style={{
   position: "absolute",
  right: 2, top: 5, flexDirection: "row",
}}>
        {showDatePicker && (
          <DatePicker
            value={!date ? new Date() : date}
            onChange={onDateChange_event}
            mode="date"
            textColor="black"
            minimumDate={new Date()}
          />
        )}
        {showTimePicker && (
          <DatePicker
            value={!time ? new Date() : time}
            onChange={onTimeChange_event}
            mode="time"
            textColor="black"
          />
        )}
        </View>
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
    paddingLeft:1
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  placeholder: {
    // color: "grey", 
    alignItems:"center",
    justifyContent:"center",
    fontSize:16,
    paddingTop:12
    // Set constant placeholder color
  },
});
