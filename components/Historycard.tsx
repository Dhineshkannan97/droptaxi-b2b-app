import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { primaryColour } from '../Constant';
import { formatDateTime } from '../functions/utils';

interface HistoryCardProps {
  journeyId: string;
  from: string;
  to: string;
  driverName: string;
  onCancelPress: () => void;
  pickupPoint: string;
  dropPoint: string;
  tripType: string;
  numDays: number;
  journeyOn: string;
  status: string;
  vehicleType: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  journeyId,
  from,
  to,
  driverName,
  onCancelPress,
  pickupPoint,
  dropPoint,
  tripType,
  numDays,
  journeyOn,
  status,
  vehicleType,
}) => {
   const finalFormattedDateTime = formatDateTime(journeyOn);
  return (
    <View style={styles.container}>
      {renderIconWithLabel('location-on', from, 'From', 'green')}
      {renderIconWithLabel('arrow-forward', to, 'To', 'red')}
      {renderIconWithLabel('directions-car', vehicleType, 'Vehicle Type', 'orange')}
      {renderIconWithLabel('location-pin', pickupPoint, 'Pickup Point', 'green')}
      {renderIconWithLabel('location-pin', dropPoint, 'Drop Point', 'red')}
      {renderIconWithLabel('trip-origin', tripType, 'Trip Type', 'blue')}
      {renderIconWithLabel('date-range', `${numDays} days`, 'Num of Days', 'blue')}
      {renderIconWithLabel('access-time', finalFormattedDateTime, 'Journey On', 'purple')}
      {renderIconWithLabel('info', status, 'Status', 'purple')}
      {renderIconWithLabel('person', driverName, 'Driver Status', 'purple')}
      <TouchableOpacity style={styles.cancelButton} onPress={onCancelPress}>
        <Text style={{alignItems:"center",fontWeight:"bold"}} >Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  function renderIconWithLabel(iconName: string, text: string, label: string, color: string) {
    return (
      <View style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={20} color={color} />
        <Text>
          {label}: {text}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  cancelButton: {
    backgroundColor: primaryColour,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default HistoryCard;
