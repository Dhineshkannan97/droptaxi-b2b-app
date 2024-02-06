import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

export const JourneyModal = ({ isVisible, onClose }) => {
    const height = Dimensions.get("window").height;
    return (
        <Modal
          isVisible={isVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={onClose}
          onSwipeComplete={onClose}
          swipeDirection={['down']}
          style={{
            justifyContent: 'center',
            margin:0,
          }}
        >
          <SafeAreaView style={{ flex: 1 , justifyContent: 'center', alignItems:"center"}}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 20,
                borderColor: 'orange',
                borderWidth: 2,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                elevation: 5,
                width:'80%',
              }}
            >
              <Text style={{ fontSize: 20, textAlign: 'center' }}>Journey Booked</Text>
              <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', padding: 12 }}>
                <Text style={{ color: 'orange' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
    );
};

