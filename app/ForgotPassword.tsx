import { View, Text, Dimensions, Button, Keyboard } from "react-native";
import Background from "../components/Background";
import Btn from "../components/btn";
import {
  AppMode,
  primaryColour,
} from "../Constant";
import Field from "../components/Field";
import React, { useEffect , useState } from "react";
import { apiForgotPassword } from "../functions/api";
import { showToast } from "../functions/utils";

const ForgotPassword = (props) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [emailId, setEmailId] = useState<string>("");
  useEffect(() => {
    const cleanPlaceHolder = props.navigation.addListener("blur", () => {
      // Resetting the state when navigating away from this screen
      setEmailId("");
    });
    return cleanPlaceHolder;
  }, [props.navigation]);
  const ForgotPasswordFn = async () => {
    if (emailId.length > 0) {
      var formdata = new FormData();
      formdata.append("dummy", "true");
      formdata.append("emailID", emailId);
      let PasswordData = await apiForgotPassword(formdata);
      if (AppMode === "dev") {
        console.log("PasswordData >>>>>>>>>>" + PasswordData);
      }
      if (PasswordData?.status == "success") {
        Keyboard.dismiss();
        showToast(PasswordData.message);
        props.navigation.navigate("Login");
      } else {
        Keyboard.dismiss();
        showToast(PasswordData.message);
      }
    }
  };

  return (
    <Background>
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
          Forgot Password
        </Text>
        <Field
          placeholder="Email / Username"
          keyboardType={"email-address"}
          onChangeText={(v: any) => {
            setEmailId(v);
          }}
          value={emailId}
        />
        <View
          style={{
            width: "78%",
            paddingRight: 16,
            marginBottom: 200,
            alignItems: "center",
          }}
        ></View>
        <Btn
          textColor="white"
          bgColor={primaryColour}
          btnLabel="Send"
          Press={() => ForgotPasswordFn()}
        />
      </View>
    </Background>
  );
};
export default ForgotPassword;
