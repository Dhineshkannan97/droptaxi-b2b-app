import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Background from "../components/Background";
import Btn from "../components/btn";
import { primaryColour } from "../Constant";
import Field from "../components/Field";
import React, { useEffect, useState } from "react";
import { apiGetLoginData } from "../functions/api";
import { showToast } from "../functions/utils";

const Login = (props) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let AppMode = "dev";
  useEffect(() => {
    const cleanPlaceHolder =props.navigation.addListener("blur", () => {
      // Resetting the state when navigating away from this screen
      setEmailId("");
      setPassword("");
    });
    return cleanPlaceHolder;
  }, [props.navigation]);
  const handleLoginButton = async () => {
   
    // Checking for username and password validity
    if (AppMode === "dev") {
      console.log("username in the login screen : ", emailId);
      console.log("password in the login screen : ", password);
    }
    if (emailId.length > 0 && password.length > 0) {
      // Performing login API call
      var formdata = new FormData();
      formdata.append("loginapi", "true");
      formdata.append("emailId", emailId);
      formdata.append("passWord", password);
      console.log(formdata);

      let loginData = await apiGetLoginData(formdata);
      // Handling different scenarios based on API response message
      if (loginData != null) {
        // Successful login
        if (loginData.status == "success") {
          props.navigation.navigate("DrawerScreen")
          showToast(loginData.message);
          if (AppMode === "dev") {
            console.log(loginData.message);
          }
        }else{
          showToast(loginData.message);
        }
      }
    } else {
      // Handling case where username or password is empty
      if (AppMode === "dev") {
        console.log("Username and Password cannot be empty");
        showToast("Username and Password cannot be empty");
      }
    }
  };
  return (
    <Background>
      <View style={{ width: width, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            height: height,
            width: width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 40, color: primaryColour, fontWeight: "bold" }}
          >
            Welcome 
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
            onChangeText={(v: any) => {
              setEmailId(v);
            }}
            value={emailId}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(v) => {
              setPassword(v);
            }}
            value={password}
          />
          <View
            style={{
              width: "78%",
              paddingRight: 16,
              marginBottom: 200,
              alignItems: "center",
            }}
          >
             <TouchableOpacity
              onPress={() => props.navigation.navigate("ForgotPassword")}
            >
            <Text
              style={{ color: primaryColour, fontWeight: "bold", fontSize: 16 }}
            >
              Forgot Password ?
            </Text>
            </TouchableOpacity>
          </View>
          <Btn
            textColor="white"
            bgColor={primaryColour}
            btnLabel="Login"
            Press={() => 
            handleLoginButton()
          }
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={{
                  color: primaryColour,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
