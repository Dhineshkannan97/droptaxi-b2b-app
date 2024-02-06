// import React from 'react';
import { View, Text, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Background from "../components/Background";
import Btn from "../components/btn";
import { AppMode, primaryColour } from "../Constant";
import Field from "../components/Field";
import React, { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import { apiProfile, apiUpdateProfile } from "../functions/api";
import { getUser, showToast } from "../functions/utils";
import RadioButtonsGroup, {
  RadioGroup,
} from "react-native-radio-buttons-group";
import { useIsFocused } from "@react-navigation/native";
import DropdownComponent from "../components/DropDown";


const Profile = (props) => {
  // for textinput
  const isFocused = useIsFocused();

  const [organizationName, setOrganizationName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [alternateContactNo, setAlternateContactNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankIFSCCode, setBankIFSCCode] = useState("");
  const [panNo, setPanNo] = useState("");
  const [trainTicketBooking, setTrainTicketBooking] = useState("false");
  const [flightTicketBooking, setFlightTicketBooking] = useState("false");
  const [passportApplication, setPassportApplication] = useState("false");
  const [visaProcessing, setVisaProcessing] = useState("false");
  const [otherServices, setOtherServices] = useState("");
  useEffect(() => {
    const cleanPlaceHolder =props.navigation.addListener("blur", () => {
      // Resetting the state when navigating away from this screen
      setOrganizationName("");
      setContactPerson("");
      setMobileNo("");
      setAlternateContactNo("");
      setEmailId("");
      setAddress("");
      setLandmark("");
      setCity("");
      setDistrict("");
      setPincode("");
      setState("");
      setBankAccountName("");
      setBankAccountNo("");
      setBankName("");
      setBankBranch("");
      setPanNo("");
      setTrainTicketBooking("");
      setFlightTicketBooking("");
      setPassportApplication("");
      setVisaProcessing("");
      setOtherServices("");
    });
    return cleanPlaceHolder;
  }, [props.navigation]);
  const handleRadioChange = (service, value) => {
    switch (service) {
      case "trainTicketBooking":
        setTrainTicketBooking(value);
        break;
      case "flightTicketBooking":
        setFlightTicketBooking(value);
        break;
      case "passportApplication":
        setPassportApplication(value);
        break;
      case "visaProcessing":
        setVisaProcessing(value);
        break;
      default:
        break;
    }
  };
  // ...............................
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [agid, setAgid] = useState("");
  const [agtypeid, setAgtypeid] = useState("");
  const fatchProfileData = async () => {
    const asyncData = await getUser();
    setAgid(asyncData.data.agid);
    setAgtypeid(asyncData.data.agtypeid);
    var formdata = new FormData();
    formdata.append("agid", asyncData.data.agid);
    formdata.append("agtypeid", asyncData.data.agtypeid);
    let response = await apiProfile(formdata);
    if (AppMode === "dev") {
    console.log(response.data);
    }
    setOrganizationName(response.data.AG_ORG_NAME);
    setContactPerson(response.data.AG_CONTACT_PERSON);
    setMobileNo(response.data.AG_MOBILE_NO);
    setEmailId(response.data.AG_EMAIL);
  };
  useEffect(() => {
    if (AppMode === "dev") {
console.log("organizationName >>>>>>>>>>> ");
console.log(organizationName);
    }
  }, [organizationName]);

  useEffect(() => {
    fatchProfileData();
  }, [isFocused]);
  const handleUpdateBtn = async () => {
    if (!organizationName) {
      showToast('Please enter Organization Name');
      return;
    }
  
    // Validate contactPerson
    if (!contactPerson) {
      showToast('Please enter Contact Person');
      return;
    }
  
    // Validate mobileNo
    if (!mobileNo) {
      showToast('Please enter Mobile No');
      return;
    }
  
    // Validate alternateContactNo if needed
    if (!alternateContactNo) {
      showToast('Please enter Alternate Contact No');
      return;
    }
  
    // Validate emailId
    if (!emailId) {
      showToast('Please enter Email ID');
      return;
    }
  
    // Validate address
    if (!address) {
      showToast('Please enter Address');
      return;
    }
  
    // Validate landmark if needed
    if (!landmark) {
      showToast('Please enter Landmark');
      return;
    }
  
    // Validate city
    if (!city) {
      showToast('Please enter City');
      return;
    }
  
    // Validate district
    if (!district) {
      showToast('Please enter District');
      return;
    }
  
    // Validate pincode
    if (!pincode) {
      showToast('Please enter Pincode');
      return;
    }
  
    // Validate state
    if (!state) {
      showToast('Please select a State');
      return;
    }
  
    // Validate bankAccountName
    if (!bankAccountName) {
      showToast('Please enter Bank Account Name');
      return;
    }
  
    // Validate bankAccountNo
    if (!bankAccountNo) {
      showToast('Please enter Bank Account No');
      return;
    }
  
    // Validate bankName
    if (!bankName) {
      showToast('Please enter Bank Name');
      return;
    }
  
    // Validate bankBranch
    if (!bankBranch) {
      showToast('Please enter Bank Branch');
      return;
    }
  
    // Validate bankIFSCCode
    if (!bankIFSCCode) {
      showToast('Please enter Bank IFSC Code');
      return;
    }
  
    // Validate panNo
    if (!panNo) {
      showToast('Please enter PAN No');
      return;
    }
  
    // Validate radio button selections
    if (!trainTicketBooking || !flightTicketBooking || !passportApplication || !visaProcessing) {
      showToast('Please select all service options');
      return;
    }
  
    // Validate otherServices if needed
    if (!otherServices) {
      showToast('Please enter Other Services');
      return;
    }
    var formdata = new FormData();
formdata.append("agid",agid);
formdata.append("orgName", organizationName);
formdata.append("contactPerson", contactPerson);
formdata.append("mobileNo", mobileNo);
formdata.append("emailID", emailId);
formdata.append("altNo", alternateContactNo);
formdata.append("address", address);
formdata.append("landmark", landmark);
formdata.append("city", city);
formdata.append("district",district);
formdata.append("pincode",pincode);
formdata.append("state", "State");
formdata.append("acname", bankAccountName);
formdata.append("acno", bankAccountNo);
formdata.append("bankname", bankName);
formdata.append("bankbranch", bankBranch);
formdata.append("ifsc", bankIFSCCode);
formdata.append("panno",panNo);
formdata.append("traintkt",trainTicketBooking);
formdata.append("flighttkt",flightTicketBooking);
formdata.append("passport",passportApplication);
formdata.append("visa", visaProcessing);
formdata.append("otherservices", otherServices);
let response = await apiUpdateProfile(formdata);
if (AppMode === "dev") {
 console.log(response.message);
}
 showToast(response.message);
  };

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
              color: primaryColour,
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
           Business Profile
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,color: primaryColour }}>Contact Details</Text>
          <Field
            placeholder="Organization Name"
            keyboardType={"email-address"}
            onChangeText={(v: any) => {
              setOrganizationName(v);
            }}
              value={organizationName}
          />
          <Field
            placeholder="Contact Person"
            onChangeText={(v) => {
              setContactPerson(v);
            }}
              value={contactPerson}
          />
          <Field
            placeholder="Mobile No"
            keyboardType="numeric"
            onChangeText={(v: any) => {
              setMobileNo(v);
            }}
            value={mobileNo}
          />

          <Field
            placeholder="Alternate Contact No."
            keyboardType="numeric"
            onChangeText={(v: any) => {
              setAlternateContactNo(v);
            }}
            value={alternateContactNo}
          />

          <Field
            placeholder="Email ID"
            onChangeText={(v: any) => {
              setEmailId(v);
            }}
            value={emailId}
          />
 <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,color: primaryColour }}>Location Details</Text>
          <Field
            placeholder="Address"
            onChangeText={(v: any) => {
              setAddress(v);
            }}
            value={address}
          />

          <Field
            placeholder="Landmark"
            onChangeText={(v: any) => {
              setLandmark(v);
            }}
            value={landmark}
          />

          <Field
            placeholder="City"
            onChangeText={(v: any) => {
              setCity(v);
            }}
            value={city}
          />
          <Field
            placeholder="District"
            onChangeText={(v: any) => {
              setDistrict(v);
            }}
            value={district}
          />
          <Field
            placeholder="Pincode"
            keyboardType="numeric"
            onChangeText={(v: any) => {
              setPincode(v);
            }}
            value={pincode}
          />
          <DropdownComponent
          
          data={[
            { label: 'Tamilnadu', value: 'Tamilnadu' },
            { label: 'Kerala', value: 'Kerala' },
            { label: 'Karnataka', value: 'Karnataka' },
            { label: 'Andhra Praddesh', value: 'Andhra Praddesh' },
          ]}
          onChangeText={(value) => setState(value)} 
          labelField={'label'} valueField={'value'}
           onChange={function (item: { label: string; value: string; }): void {
            setState(item.value)
          } }       
          
          placeholder="State"
          value={state}
          />
 <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,color: primaryColour }}>Bank / PAN Details</Text>

          <Field
            placeholder="Bank Account Name"
            onChangeText={(v: any) => {
              setBankAccountName(v);
            }}
            value={bankAccountName}
          />
          <Field
            placeholder="Bank Account No."
            onChangeText={(v: any) => {
              setBankAccountNo(v);
            }}
            value={bankAccountNo}
          />
          <Field
            placeholder="Bank Name"
            onChangeText={(v: any) => {
              setBankName(v);
            }}
            value={bankName}
          />
          <Field
            placeholder="Bank Branch"
            onChangeText={(v: any) => {
              setBankBranch(v);
            }}
            value={bankBranch}
          />
          <Field
            placeholder="Bank IFSC Code"
            onChangeText={(v: any) => {
              setBankIFSCCode(v);
            }}
            value={bankIFSCCode}
          />
          <Field
            placeholder="PAN No."
            onChangeText={(v: any) => {
              setPanNo(v);
            }}
            value={panNo}
          />
<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,color: primaryColour }}>Service Details</Text>
          <View style={{ alignItems: 'flex-start', margin: 10 }}>
            <Text>Train Ticket Booking</Text>
            <RadioGroup
              radioButtons={[
                { id: "1", label: "Done", value: "true" },
                { id: "2", label: "Not Done", value: "false" },
              ]}
              onPress={(value) =>
                handleRadioChange("trainTicketBooking", value)
              }
              selectedId={trainTicketBooking}
              layout="row"
            />
          </View>

          <View style={{ alignItems: 'flex-start', margin: 10 }}>
            <Text>Flight Ticket Booking</Text>
            <RadioGroup
              radioButtons={[
                { id: "3", label: "Done", value: "true" },
                { id: "4", label: "Not Done", value: "false" },
              ]}
              onPress={(value) =>
                handleRadioChange("flightTicketBooking", value)
              }
              selectedId={flightTicketBooking}
              layout="row"
            />
          </View>

          <View style={{ alignItems: 'flex-start', margin: 10 }}>
            <Text>Passport Application</Text>
            <RadioGroup
              radioButtons={[
                { id: "5", label: "Done", value: "true" },
                { id: "6", label: "Not Done", value: "false" },
              ]}
              onPress={(value) =>
                handleRadioChange("passportApplication", value)
              }
              selectedId={passportApplication}
              layout="row"
            />
          </View>

          <View style={{ alignItems: 'flex-start', margin: 10 }}>
            <Text>Visa Processing</Text>
            <RadioGroup
              radioButtons={[
                { id: "7", label: "Done", value: "true" },
                { id: "8", label: "Not Done", value: "false" },
              ]
            }
              onPress={(value) => handleRadioChange("visaProcessing", value)}
              selectedId={visaProcessing}
              layout="row"
            />
          </View>
          <Field
            placeholder="Other Services"
            onChangeText={(v: any) => {
              setOtherServices(v);
            }}
            value={otherServices}
          />
          <Btn
            textColor="white"
            bgColor={primaryColour}
            btnLabel="Update"
            Press={() =>handleUpdateBtn()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
};

export default Profile;
