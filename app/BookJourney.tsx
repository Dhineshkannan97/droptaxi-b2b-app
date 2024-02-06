import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Background from "../components/Background";
import Btn from "../components/btn";
import { primaryColour } from "../Constant";
import Field from "../components/Field";
import { DateTimePicker } from "../components/DateAndTimePicker";
import DropdownComponent from "../components/DropDown";
import { apiBookJourney, apiGetAppData } from "../functions/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, replaceThirdFromLast, showToast } from "../functions/utils";
import { JourneyModal } from "../components/JourneyBookedPopup";

const BookJourney = (props) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [journeyType, setJourneyType] = useState<string>("");
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [numberOfDays, setNumberOfDays] = useState<any>();
  const [vehicleType, setVehicleType] = useState<string>("");
  const [paymentBy, setPaymentBy] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerMobileNo, setCustomerMobileNo] = useState<string>("");
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [dropAddress, setDropAddress] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [date, setDate] = useState<Date | any>(null);
  const [time, setTime] = useState<Date | any>(null);
  const emptyPlaceHolder = () => {
    setJourneyType("");
    setFromLocation("");
    setToLocation("");
    setNumberOfDays("");
    setVehicleType("");
    setPaymentBy("");
    setMobileNo("");
    setCustomerName("");
    setCustomerMobileNo("");
    setPickupAddress("");
    setDropAddress("");
    setComments("");
    setDate(null);
    setTime(null);
  };
  useEffect(() => {
    const cleanPlaceHolder = props.navigation.addListener("blur", () => {
      emptyPlaceHolder();
    });
    return cleanPlaceHolder;
  }, [props.navigation]);
  //  for city drop down

  useEffect(() => {
    apiGetAppData();
    fetchData();
  }, []);

  // try with the api

  const [dropdownData, setDropdownData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      // Make API call
      const result = await AsyncStorage.getItem("app_data");
      if (result === null) {
        if (AppMode === "dev") {
          console.log("No data found in AsyncStorage for key 'app_data'");
        }
        return;
      }
      const results = JSON.parse(result);
      if (AppMode === "dev") {
        console.log("appdata in bookjourny ......" + results);
      }
      // Map the data
      const mappedData = results.map((city) => ({
        label: city.CM_CITY_NAME,
        value: city.CM_CITY_NAME,
        // You can adjust this field based on your needs
      }));
      if (AppMode === "dev") {
        console.log("Dropdown Data: ", mappedData);
      }
      const sortedData = mappedData.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      // Set the state with the mapped data
      setDropdownData(sortedData);
    } catch (error) {
      if (AppMode === "dev") {
        console.error("Error fetching data: ", error);
      }
      // Handle error appropriately
    }
  };
  //for date and time
  const combinedDateTime = () => {
    if (date && time) {
      console.log("from combined " + time);

      const dateStr = date.toLocaleDateString();
      console.log("from dateStr " + dateStr);
      let timeStr = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      console.log("from timeStr - before " + timeStr);

      timeStr = replaceThirdFromLast(timeStr, " ");

      console.log("from timeStr - after " + timeStr);

      return `${dateStr} ${timeStr}`;
    }
    return null;
  };


  // handele bookbutton
  const handleBookJourney = async () => {
    try {
      const asyncData = await getUser();
      var formdata = new FormData();
      formdata.append("triptype", journeyType);
      formdata.append("rtfromplace", fromLocation);
      formdata.append("rttoplace", toLocation);
      const formattedDateTime = combinedDateTime();
      if (formattedDateTime) {
        formdata.append("rtdoj", formattedDateTime);
      }
      formdata.append("rtdays", numberOfDays);
      formdata.append("rtvehicletype", vehicleType);
      formdata.append("mobileNo", mobileNo);
      formdata.append("custName", customerName);
      formdata.append("custMobileNo", customerMobileNo);
      formdata.append("agencyjourneypayment", paymentBy);
      formdata.append("remarks", comments);
      formdata.append("ppaddr", pickupAddress);
      formdata.append("dpaddr", dropAddress);
      formdata.append("agid", asyncData.data.agid);

      // Validate dropdown selections
      if (!journeyType) {
        showToast("Please select a journey type");
        return;
      }

      if (!fromLocation || !toLocation) {
        showToast('Please select both "From" and "To" locations');
        return;
      }

      // Validate date and time
      if (!date || !time) {
        showToast("Please select both date and time");
        return;
      }

      // Validate other input fields
      if (
        !numberOfDays ||
        !vehicleType ||
        !paymentBy ||
        !mobileNo ||
        !customerName ||
        !customerMobileNo ||
        !pickupAddress ||
        !dropAddress
      ) {
        showToast("Please fill in all required fields");
        return;
      }

      const response = await apiBookJourney(formdata);
      if (AppMode === "dev") {
        console.log("API Response:", response);
      }
      showToast("Journey booked successfully");
      setModalVisible(true);
      emptyPlaceHolder();
      // props.navigation.navigate('SuccessScreen');
    } catch (error) {
      if (AppMode === "dev") {
        console.error("Error booking journey: ", error);
      }
      showToast("Error booking journey. Please try again.");
    }
  };

  let AppMode = "dev";
  return (
    <Background>
    <KeyboardAvoidingView
    style={{  backgroundColor: "white",
        height: height,
         width: width,
        // borderTopLeftRadius: 140,
        //  paddingTop: 50,
          alignItems: "center", }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150} // Adjust as needed
  >
        <ScrollView
          contentContainerStyle={{
            // backgroundColor: 'white',
            // height: height,
            paddingVertical: 50, // Adjust as needed
            paddingHorizontal: 5, // Adjust as needed
            width: width,
            // borderTopLeftRadius: 130,
            // paddingTop: 40,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: primaryColour,
            }}
          >
            Journey Details
          </Text>
          <DropdownComponent
            data={[
              { label: "Drop Trip", value: "droptrip" },
              { label: "Round Trip", value: "roundtrip" },
            ]}
            onChangeText={(value) => setJourneyType(value)}
            labelField={"label"}
            valueField={"value"}
            onChange={(item) => {
              setJourneyType(item.value); // Update the state variable with the selected value
            }}
            placeholder="Journey Type"
            value={journeyType}
          />

          <DropdownComponent
            data={dropdownData}
            onChangeText={(value) => setFromLocation(value)}
            labelField={"label"}
            valueField={"label"}
            onChange={(item) => {
              setFromLocation(item.value); // Update the state variable with the selected value
            }}
            placeholder="From"
            value={fromLocation}
            search={true}
          />

          <DropdownComponent
            data={dropdownData}
            onChangeText={(value) => setToLocation(value)}
            labelField={"label"}
            valueField={"label"}
            onChange={(item) => {
              setToLocation(item.value); // Update the state variable with the selected value
            }}
            placeholder="To"
            value={toLocation}
            search={true}
          />
          <DateTimePicker
            date={date}
            time={time}
            onDateChange={(date) => {
              setDate(date);
            }}
            onTimeChange={(time) => {
              setTime(time);
            }}
          />

          <DropdownComponent
            data={[...Array(15).keys()].map((i) => ({
              label: `${i + 1} days`,
              value: i + 1,
            }))}
            onChangeText={(value) => setNumberOfDays(value)}
            labelField={"label"}
            valueField={"value"}
            onChange={function (item: { label: string; value: number }): void {
              console.log("Selected Trip days:", item);
              setNumberOfDays(item.value);
            }}
            placeholder=" Number Of Days"
            value={numberOfDays}
          />

          <DropdownComponent
            data={[
              { label: "Sedan", value: "558784ee2e854" },
              { label: "MUV", value: "5587850448ce6" },
              { label: "MUV", value: "5587850448ce6" },
            ]}
            onChangeText={(value) => setVehicleType(value)}
            labelField={"label"}
            valueField={"value"}
            onChange={function (item: { label: string; value: string }): void {
              setVehicleType(item.value);
            }}
            placeholder=" Vehicle Type"
            value={vehicleType}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: primaryColour,
            }}
          >
            Customer Details
          </Text>

          <Field
            placeholder="Mobile No"
            keyboardType="numeric"
            onChangeText={(v: any) => {
              setMobileNo(v);
            }}
            value={mobileNo}
          />

          <Field
            placeholder="Customer Name"
            onChangeText={(v: any) => {
              setCustomerName(v);
            }}
            value={customerName}
          />

          <Field
            placeholder="Customer Mobile No"
            keyboardType="numeric"
            onChangeText={(v: any) => {
              setCustomerMobileNo(v);
            }}
            value={customerMobileNo}
          />

          <Field
            placeholder="Pickup Point Address"
            onChangeText={(v: any) => {
              setPickupAddress(v);
            }}
            value={pickupAddress}
          />

          <Field
            placeholder="Drop Point Address"
            onChangeText={(v: any) => {
              setDropAddress(v);
            }}
            value={dropAddress}
          />

          <Field
            placeholder="Comments / Remarks"
            onChangeText={(v: any) => {
              setComments(v);
            }}
            value={comments}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: primaryColour,
            }}
          >
            Payment Details
          </Text>
          <DropdownComponent
            data={[
              { label: "Customer", value: "Customer" },
              { label: "Agency", value: "Agency" },
            ]}
            onChangeText={(value) => setPaymentBy(value)}
            labelField={"label"}
            valueField={"label"}
            onChange={function (item: { label: string; value: string }): void {
              setPaymentBy(item.value);
            }}
            placeholder=" Payment By"
            value={paymentBy}
          />
          <Btn
            textColor="white"
            bgColor={primaryColour}
            btnLabel="Book"
            Press={() => {
              handleBookJourney();
            }}
          />
          <JourneyModal
            isVisible={isModalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
          />
        </ScrollView>
         </KeyboardAvoidingView>
    </Background>
  );
};

export default BookJourney;
