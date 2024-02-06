// import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import Background from "../components/Background";
import Btn from "../components/btn";
import { primaryColour } from "../Constant";
import Field from "../components/Field";
import React, { useEffect, useState } from "react";
import { apiChangePassword } from "../functions/api";
import { getUser, showToast } from "../functions/utils";

const ChangePassword = (props) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [confrimPassword, setConfrimPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  let AppMode = "dev";
  useEffect(() => {
    const cleanPlaceHolder = props.navigation.addListener("blur", () => {
      // Resetting the state when navigating away from this screen
      setConfrimPassword("");
      setNewPassword("");
    });
    return cleanPlaceHolder;
  }, [props.navigation]);
  const handleResetButton = async () => {
    if (confrimPassword.length > 0 && newPassword.length > 0) {
      const asyncData = await getUser();
      var formdata = new FormData();
      formdata.append("newpwd1", confrimPassword);
      formdata.append("agid", asyncData.data.agid);
      formdata.append("agtypeid", asyncData.data.agtypeid);
      if (AppMode === "dev") {
        console.log(formdata);
      }

      if (confrimPassword == newPassword) {
        let passwordData = await apiChangePassword(formdata);
        if (AppMode === "dev") {
          console.log("pasword data............" + passwordData);
        }
        if (passwordData != null) {
          if (passwordData.status == "success") {
            showToast(passwordData.message);
            setConfrimPassword("");
            setNewPassword("");
          } else {
            showToast(passwordData.message);
          }
        }
      } else {
        if (AppMode === "dev") {
          console.log("Password should be same");
          showToast("Password should be same");
        }
      }
    } else {
      if (AppMode === "dev") {
        console.log("ConfrimPassword and NewPassword cannot be empty");
        showToast("ConfrimPassword and NewPassword cannot be empty");
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
          <Image
            source={require("../assets/Key-rafiki.png")}
            style={{ height: 130, width: 100, marginBottom: 20 }}
          />
          <Field
            placeholder="New password "
            secureTextEntry={true}
            onChangeText={(v: any) => {
              setNewPassword(v);
            }}
            value={newPassword}
          />
          <Field
            placeholder="Confrim New Password"
            secureTextEntry={true}
            onChangeText={(v) => {
              setConfrimPassword(v);
            }}
            value={confrimPassword}
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
                style={{
                  color: primaryColour,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <Btn
            textColor="white"
            bgColor={primaryColour}
            btnLabel="Reset"
            Press={() => handleResetButton()}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          ></View>
        </View>
      </View>
    </Background>
  );
};

export default ChangePassword;
