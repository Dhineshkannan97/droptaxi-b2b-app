import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";
import * as React from 'react';
import Welcome from './app/Welcome';
import Login from './app/Login';
import Signup from './app/Signup';
import ForgotPassword from './app/ForgotPassword';
import DrawerScreen from './components/DrawerScreen';
import { useEffect, useRef, useState } from 'react';
import { apiGetAppData } from './functions/api';
import { AppDataContext } from './context';
import { getUser } from './functions/utils';

const Stack = createNativeStackNavigator();

export default function App() {
  // SplashScreen.preventAutoHideAsync(); //Show splash screen until we finish async reading
  const fontLoaded = useFonts({
    caricons: require("./assets/fonts/caricons.ttf"),
  });
  const [emailId, setEmailId] = useState();
  const [mobileNum, setMobileNum] = useState();
  let agencyData ;
  const handleAgencyData = async ()=>{

     let agencyData  = await getUser();
     if (agencyData != null){
     setEmailId(agencyData.data.agemail);
     setMobileNum(agencyData.data.agmobileno);
     }
  }
    
  useEffect(() => {
      handleAgencyData()
  }, [])
  
  // const [appData, setAppData] = useState<any>();
  // let [DataLoaded, setDataLoaded] = useState(false);
  // let firstLoad = useRef(true);
  
  // useEffect(() => {
  //   async function initData() {
  //     console.log("Initial Load");
  //     try {
  //       setAppData(await apiGetAppData());
  //       console.log("appdata..........."+appData);
        
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setDataLoaded(true);
  //     }
  //   }
  //   if (!DataLoaded && firstLoad.current) {
  //     firstLoad.current = false;
  //     initData();
  //   }
  // }, []);

  if (fontLoaded) {
    return (
      // Render the NavigationContainer
      // <AppDataContext.Provider value={appData}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#E5A524" },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "white",
            // Set header title font family
            },
          }}
          initialRouteName={
            mobileNum!= "" && emailId
              ? "DrawerScreen"
              : "Welcome"
          }
        >
           {/* <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
                    name="DrawerScreen"
                    component={DrawerScreen}
                    options={{ headerShown: false }}
                  />
        </Stack.Navigator>
      </NavigationContainer>
      // </AppDataContext.Provider>
    );
}

}
