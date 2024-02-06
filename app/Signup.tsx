import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Keyboard,
} from "react-native";
import Background from "../components/Background";
import Btn from "../components/btn";
import {primaryColour } from "../Constant";
import Field from "../components/Field";
import { apiOrgData } from "../functions/api";
import { showToast } from "../functions/utils";

const Signup = (props) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [orgName, setOrgName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNum, setContactNum] = useState<number>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  let AppMode = "dev";
  useEffect(() => {
    const cleanPlaceHolder = props.navigation.addListener("blur", () => {
      // Resetting the state when navigating away from this screen
      setOrgName("");
      setContactPerson("");
      setEmail("");
      setContactNum(null);
      setPassword("");
      setConfirmPassword("");
    });
    return cleanPlaceHolder;
  }, [props.navigation]);
  const signUpFn = async () => {
   
    // return;
    if (orgName.length >= 5) {
      if (password == confirmPassword) {
        if (AppMode === "dev") {
          console.log("password and confirmPassword match");
        }
        if (password.length == 8) {
          var formdata = new FormData();
          formdata.append("signUpFn", "true");
          formdata.append("orgName", orgName);
          formdata.append("contactPerson", contactPerson);
          formdata.append("emailID", email);
          formdata.append("mobileNo", contactNum.toString());
          formdata.append("pwd", password);
          console.log(formdata);

          let userData = await apiOrgData(formdata);
          // Check if userData is not null or undefined before accessing its properties
          if (userData && userData.status) {
            if (userData.status === "success") {
              Keyboard.dismiss();
              showToast(userData.message);
              props.navigation.navigate("Login");
            } else {
              Keyboard.dismiss();
              showToast(userData.message);
            }
          } else {
            Keyboard.dismiss();
            console.error("Error in API response:", userData);
            showToast("An error occurred while processing your request.");
          }
        } else {
          Keyboard.dismiss();
          if (AppMode === "dev") {
            console.log("password must be 8 characters");
          }
          showToast("password must be 8 characters");
        }
      } else {
        Keyboard.dismiss();
        if (AppMode === "dev") {
          console.log("password and confirmPassword does not match");
        }
        showToast("password and confirmPassword does not match");
      }
    } else {
      Keyboard.dismiss();
      if (AppMode === "dev") {
        console.log("orgName should have 5 to 30 characters");
      }
      showToast("orgName should have 5 to 30 characters");
    }
  };

  return (
    <Background>
      <View
        style={{
          backgroundColor: "white",
          height: height,
          width: width,
          // borderTopLeftRadius: 140,
          paddingTop: 50,
          alignItems: "center",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            // backgroundColor: 'white',
            height: height,
            width: width,
            borderTopLeftRadius: 130,
            // paddingTop: 40,
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 40, color: primaryColour, fontWeight: "bold" }}
          >
            Register
          </Text>
          <Field
            placeholder="Org Name"
            maxLength={50}
            onChangeText={(v: any) => {
              setOrgName(v);
            }}
            value={orgName}
          />
          <Field
            placeholder="Contact person"
            maxLength={50}
            onChangeText={(v: any) => {
              setContactPerson(v);
            }}
            value={contactPerson}
          />
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
            onChangeText={(v: any) => {
              setEmail(v);
            }}
            value={email}
          />
          <Field
            placeholder="Contact Number"
            maxLength={22}
            onChangeText={(v: any) => {
              setContactNum(v);
            }}
            value={contactNum}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            keyboardType="default"
            maxLength={8}
            onChangeText={(v: any) => {
              setPassword(v);
            }}
            value={password}
          />
          <Field
            placeholder="Confirm Password"
            secureTextEntry={true}
            maxLength={8}
            keyboardType="default"
            onChangeText={(v: any) => {
              setConfirmPassword(v);
            }}
            value={confirmPassword}
          />
         
          <Btn
            textColor="white"
            bgColor={primaryColour}
            btnLabel="Signup"
            Press={() => {
              signUpFn();
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Already have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{
                  color: primaryColour,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
};

export default Signup;
