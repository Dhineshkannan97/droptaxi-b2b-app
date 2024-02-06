import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import HistoryCard from "../components/Historycard";
import { apiBookingHistory, apiCancelBooking } from "../functions/api";
import { getUser, showToast } from "../functions/utils";
import { useIsFocused } from "@react-navigation/native";
import { AppMode } from "../Constant";

const BookingHistory = () => {
  const isFocused = useIsFocused();
  const [bookingData, setBookingData] = useState([]);
  const [agid, setAgid] = useState("");
  const [agtypeid, setAgtypeid] = useState("");
  const [agmobileno, setAgmobileno] = useState("");
  const [agemail, setAgemail] = useState("");
  const [cancelAction, setCancelAction] = useState(false);

  const fetchData = async () => {
    const asyncData = await getUser();
    setAgid(asyncData.data.agid);
    setAgtypeid(asyncData.data.agtypeid);
    setAgmobileno(asyncData.data.agmobileno);
    setAgemail(asyncData.data.agemail);
    try {
      var formdata = new FormData();
      formdata.append("agid", asyncData.data.agid);
      formdata.append("agtypeid", asyncData.data.agtypeid);

      let response = await apiBookingHistory(formdata);

      // Check if the response has a data property and it is an array
      if (!response || !Array.isArray(response.data)) {
        if (AppMode === "dev") {
          console.error("Invalid response structure:", response);
        }
        return;
      }

      const apiData = response.data.map((item) => ({
        journeyId: item.JD_JOURNEY_ID,
        from: item.RM_ROUTE_START_CITY || "Unknown Source",
        to: item.RM_ROUTE_DESTINATION_CITY || "Unknown Destination",
        pickupPoint: item.JD_PICKUP_POINT || "Unknown Pickup Point",
        dropPoint: item.JD_DROP_POINT || "Unknown Drop Point",
        tripType: item.JD_JOURNEY_TYPE || "Unknown Trip Type",
        numDays: item.JD_NO_OF_DAYS || "Unknown Num of Days",
        journeyOn: item.JD_DATE_TIME || "Unknown Journey On",
        status: item.JD_STATUS || "Unknown Status",
        vehicleType: item.VTM_VEHICLE_TYPE || "Unknown Vehicle Type",
        journeyDetails: item.JD_REMARKS || "No Details",
        vehicle: item.VM_VEHICLE_MODEL || "Unknown Vehicle Model",
        driverName: item.DM_DRIVER_NAME ? "Available" : "Not Available",
      }));

      setBookingData(apiData);
    } catch (error) {
      if (AppMode === "dev") {
        console.error("Error fetching booking history:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused, cancelAction]);
  const handleCancelPress = async (journeyId: string) => {
    try {
      // Assuming you have the required parameters for apiCancelBooking
      const response = await apiCancelBooking(
        agid,
        agtypeid,
        journeyId,
        agmobileno,
        agemail
      );

      if (response) {
        if (AppMode === "dev") {
          console.log("Cancel booking response:", response);
          console.log("responce message >>>>>>>" + response.message);
        }
        showToast(response.message);
        // Add further logic based on the response if needed
      } else {
        if (AppMode === "dev") {
          console.log("Failed to cancel booking.");
        }
        // Handle error scenario if needed
      }
      setCancelAction((prev) => !prev);
    } catch (error) {
      if (AppMode === "dev") {
        console.error("Error while canceling booking:", error);
      }
      // Handle error scenario if needed
    }
  };

  const renderHistoryCard = ({ item }: { item: (typeof bookingData)[0] }) => (
    <HistoryCard
      journeyId={item.journeyId}
      from={item.from}
      to={item.to}
      pickupPoint={item.pickupPoint}
      dropPoint={item.dropPoint}
      tripType={item.tripType}
      numDays={item.numDays}
      journeyOn={item.journeyOn}
      status={item.status}
      vehicleType={item.vehicleType}
      driverName={item.driverName}
      onCancelPress={() => handleCancelPress(item.journeyId)}
    />
  );
  const sortedBookingData = bookingData.slice().sort((a, b) => {
    const lastSixDigitsA = a.journeyId.slice(-6);
    const lastSixDigitsB = b.journeyId.slice(-6);
    return parseInt(lastSixDigitsB, 10) - parseInt(lastSixDigitsA, 10);
  });
  return (
    <View>
      <FlatList
        data={sortedBookingData}
        keyExtractor={(item) => item.journeyId}
        renderItem={renderHistoryCard}
      />
    </View>
  );
};

export default BookingHistory;
