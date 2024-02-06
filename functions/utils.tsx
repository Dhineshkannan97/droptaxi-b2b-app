import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";
import Toast from "react-native-root-toast";
// import { AppMode } from "../constant";

const AppMode = "dev";
// storing user data in async storage
const storeUser = async (value: object) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(value));
  } catch (error) {
    if (AppMode === "dev") {
      console.log(error);
    }
  }
};

// getting data
const getUser: any = async () => {
  try {
    const   Agency_data = await AsyncStorage.getItem("Agency_data");
    if (AppMode === "dev") {
      console.log("from getAgency_data>>>>>>>>>>" + Agency_data);
    }
    if ( Agency_data !== null) {
      return JSON.parse( Agency_data); // Return parsed Agency_data data if it exists
    }
    return null; // Return null if Agency_data data doesn't exist
  } catch (error) {
    if (AppMode === "dev") {
      console.log(error);
    }
    return null; // Return null in case of an error
  }
};
// clear Agency_data date when then user logout
const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("Agency_data");
    if (AppMode === "dev") {
      console.log("Agency data cleared successfully");
    }
  } catch (error) {
    if (AppMode === "dev") {
      console.log(error);
    }
  }
};

// Function to update the user status in AsyncStorage
const updateUserStatusInStorage = async (newStatus) => {
  try {
    await AsyncStorage.setItem("@MyApp:userStatus", JSON.stringify(newStatus));
    if (AppMode === "dev") {
      console.log("User status updated in AsyncStorage:", newStatus);
    }
  } catch (error) {
    if (AppMode === "dev") {
      console.error("Error updating user status in AsyncStorage:", error);
    }
  }
};

const showToast = (message, duration = Toast.durations.LONG) => {
  Toast.show(message, {
    duration: duration,
  });
};
export const handleLogout = (navigation: any) => {
  Alert.alert(
    "Log out",
    "Do you want to logout?",
    [
      {
        text: "Cancel",
        onPress: () => {
          return null;
        },
      },
      {
        text: "Confirm",
        onPress: () => {
          clearUserData();
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        },
      },
    ],
    { cancelable: false }
  );
};
export const handleCallPress = (phoneNumber: string = "7999222000") => {
  Linking.openURL(`tel:${phoneNumber}`);
};


const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export {
  validateEmail,
  storeUser,
  getUser,
  clearUserData,
  updateUserStatusInStorage,
  showToast,
};

// for date and time format
export function formatDateTime(dateTime: string) {
  const mysqlDatetimeObject = new Date(dateTime);

  // Convert to the desired format
  const formattedDate = `${mysqlDatetimeObject.getDate().toString().padStart(2, '0')}-${(mysqlDatetimeObject.getMonth() + 1).toString().padStart(2, '0')}-${mysqlDatetimeObject.getFullYear()}`;

  const formattedTime = mysqlDatetimeObject.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${formattedDate} ${formattedTime.toLowerCase()}`;
}


 export function replaceThirdFromLast(timeStr, replacementCharacter) {
  if (timeStr.length >= 3) {
    const modifiedString =
      timeStr.slice(0, -3) + replacementCharacter + timeStr.slice(-2);
    return modifiedString;
  } else {
    return "Input string is too short to replace the third character from last.";
  }
}