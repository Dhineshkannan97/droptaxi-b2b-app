import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { primaryColour } from "../Constant";
import BookingHistory from "../app/BookingHistory";
import BookJourney from "../app/BookJourney";
import Profile from "../app/Profile";
import ChangePassword from "../app/ChangePassword";
import { clearUserData, getUser, handleCallPress, handleLogout } from "../functions/utils";

const DrawerScreen = () => {
  const Drawer = createDrawerNavigator();
  const [agencyName, setAgencyName] = useState<string>("");
const getOrgName = async()=>{ 
  const asyncData = await getUser();
  setAgencyName(asyncData.data.agname)
  console.log('Agency Name:', agencyName);
}
useEffect(() => {
  getOrgName();
}, [])


  const CustomDrawer = (props) => (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: primaryColour, padding: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 2 }}>
          <View>
            <Text style={{ fontSize: 25, color: "white" }}>DropTaxi B2B</Text>
          </View>
        </View>
        <Text style={{ fontSize: 25, color: "white" }}>{agencyName}</Text>
      </View>
      <DrawerItemList {...props} />
      {/* Add vector-icon and call icons */}
    
      <DrawerItem
        label="Call US"
        onPress={() => handleCallPress()}
        icon={({ color, size }) => <MaterialIcons name="call" size={size} color="orange" />}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          clearUserData();
          handleLogout(props.navigation);
        }}
        icon={({ color, size }) => <MaterialIcons name="exit-to-app" size={size} color="orange" />}
      />
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: primaryColour },
        headerTitleStyle: {
          color: "white",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Book Journey"
        component={BookJourney}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="directions-car" size={size} color="orange" />,
        }}
      />
      <Drawer.Screen
        name="Booking History"
        component={BookingHistory}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="history" size={size} color="orange" />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color="orange" />,
        }}
      />
      <Drawer.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="lock" size={size} color="orange" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
