import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIServer } from "../Constant";

export const apiOrgData = async (data): Promise<any> => {
    console.log("apiGetUserData called >>>>>>>>>>> ");
    let signUpData = null;
    console.log("2 >>>>>>>>>>> ");

    var formdata = data;
    
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIServer}process/p-agency-signup.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };
    try {
      let response = await axios.request(config);
      console.log("response >>>>>", response)
      if (response.data) {
        console.log("response.data >>>>>", response.data)
        const data = response.data;
        console.log("data >>>>>>>>>>> ", data);
        signUpData = data;
        await AsyncStorage.setItem("Org_data", JSON.stringify(signUpData));
      }
    } catch (error) {
      console.log(error);
    }
    return signUpData;
  };

 
  export const apiForgotPassword = async (data): Promise<any> => {
    console.log("apiForgotPassword called >>>>>>>>>>> ");
    let PasswordData = null;
    var formdata = data;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIServer}process/p-agency-forgot-password.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };
    try {
      let response = await axios.request(config);
      if (response.data) {
        // console.log("response >>>>>", response)
        console.log("response.data >>>>>", response.data)
        const data = response.data;
        console.log("data >>>>>>>>>>> ", data);
        PasswordData = data;
        // await AsyncStorage.setItem("Forgotdata_data", JSON.stringify(formdata));
      }
    } catch (error) {
      console.log(error);
    }
    return PasswordData;
  }; 

  export const apiGetLoginData = async (data): Promise<any> => {
    console.log("apiGetLoginData called >>>>>>>>>>> ");
    let loginData = null;
    var formdata = data;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIServer}process/p-agency-login.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };
    try {
      let response = await axios.request(config);
      if (response.data) {
        console.log("response.data >>>>>", response.data)
        const data = response.data;
        console.log("data >>>>>>>>>>> ", data);
        loginData = data;
        await AsyncStorage.setItem("Agency_data", JSON.stringify(loginData));
      }
    } catch (error) {
      console.log(error);
    }
    return loginData;
  }; 

  export const apiChangePassword = async (data): Promise<any> => {
    console.log("apiChangePassword called >>>>>>>>>>> ");
    let PasswordData = null;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIServer}process/p-agency-change-password.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    try {
      let response = await axios.request(config);
      if (response.data) {
        // console.log("response >>>>>", response)
        console.log("response.data >>>>>", response.data)
        const data = response.data;
        console.log("data >>>>>>>>>>> ", data);
        PasswordData = data;
      }
    } catch (error) {
      console.log(error);
    }
    return PasswordData;
  }; 

  export const apiGetAppData = async (): Promise<any> => {
    let result = "";
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://stg.droptaxee.in/biddingapi/version.php`,
        headers: {},
      };
      let response = await axios(config);
      console.log("Refreshed app data");
      result = response.data.cityinfo;
      await AsyncStorage.setItem("app_data", JSON.stringify(response.data.cityinfo));
      // console.log("response>>>>>>>>."+ result );
      
    } catch (e) {
      console.log(e);
    }
    if (result) return result;
    else return "";
  };

  export const apiBookJourney= async (data): Promise<any> => {
    console.log("apiBookJourney called >>>>>>>>>>> ");
    let JourneyData = null;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIServer}process/p-agency-booking.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    try {
      let response = await axios.request(config);
      if (response.data) {
        // console.log("response >>>>>", response)
        console.log("response.data >>>>>", response.data)
        const data = response.data;
        console.log("data >>>>>>>>>>> ", data);
        JourneyData = data;
      }
    } catch (error) {
      console.log(error);
    }
    return JourneyData;
  }; 

  export const apiBookingHistory= async (data): Promise<any> => {
    console.log("apiBookingHistory called >>>>>>>>>>> ");
    let HistoryData = null;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIServer}b2b/booking-history.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    try {
      let response = await axios.request(config);
      if (response.data) {
        // console.log("response >>>>>", response)
        // console.log("response.data >>>>>", response.data)
        const data = response.data;
        // console.log("data >>>>>>>>>>> ", data);
        HistoryData = data;
      }
    } catch (error) {
      console.log(error);
    }
    return HistoryData;
  }; 

  export const apiCancelBooking = async (agid,agtypeid,jid,agmobileno,agemail): Promise<any> => {
    let result = null;
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url:`${APIServer}process/p-agency-cancel-booking.php?agid=${agid}&agtypeid=${agtypeid}&jid=${jid}&agmobileno=${agmobileno}&agemail=${agemail}`,
        headers: {},
      };
      let response = await axios(config);
      console.log("Getting cancel booking data >>>"+response);
      result = response.data;
      // console.log("response>>>>>>>>."+ result );
      
    } catch (e) {
      console.log(e);
    }
    if (result) return result;
    else return null;
  };

  export const apiProfile = async (data): Promise<any> => {
    let result = null;
    // try {
    //   let config = {
    //     method: "get",
    //     maxBodyLength: Infinity,
    //     url:`http://192.168.2.106:8001/b2b/profile.php?agid=${agid}&agtypeid=${agtypeid}`,
    //     // headers: {},
    //   };
    //   let response = await axios(config);
    //   console.log("Getting apiProfile data >>>",response);
    //   result = response.data;
    //   console.log("result>>>>>>>>."+ result );
      
    // } catch (e) {
    //   console.log(e);
    // }

    try {
    //     let config = {
    //     method: "get",
    //     maxBodyLength: Infinity,
    //     url:`http://192.168.2.106:8001/b2b/profile.php?agid=614&agtypeid=${agtypeid}`,
    //       // headers: {},
    //     };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${APIServer}b2b/profile.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
      let response = await axios(config);
      result = response.data;
      // console.log("response >>>>>>>>>>>");
      // console.log(response);
      console.log("response.data4 >>>>>>>>>>>");
      console.log(response.data.data.AG_EMAIL);

      // console.log("response.data >>>>>>>>");
      // console.log(response?.data);
    } catch (error) {
      console.error('Error:', error);
    }
    if (result) return result;
    else return null;
  };

   export const apiUpdateProfile= async (data): Promise<any> => {
    console.log("apiUpdateProfile called >>>>>>>>>>> ");
    let profileData = null;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://192.168.2.106:8001/process/p-agency-update-profile.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    try {
      let response = await axios.request(config);
      if (response.data) {
        // console.log("response >>>>>", response)
        console.log("response.data >>>>>", response.data)
        const data = response.data;
        console.log("data >>>>>>>>>>> ", data);
        profileData = data;
      }
    } catch (error) {
      console.log(error);
    }
    return profileData;
  }; 