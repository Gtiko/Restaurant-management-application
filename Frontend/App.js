import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalContext } from "./components/GlobalContext";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { KEY, LOCAL_IP } from "./components/config/constant";

const Stack = createNativeStackNavigator();


export default function App() {
  const [data, setData] = useState([]);
  const [ownerData, setOwnerData] = useState({});
  const [token, setToken] = useState(null);
  const [foodsList, setFoodsList] = useState({});

  useEffect(() => {
    async function getToken() {
      try {
        const result = await AsyncStorage.getItem(KEY);
        if (result) {
          const tok = JSON.parse(result);
          setToken(tok);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getToken();
  }, [token]);
  
  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(`http://${LOCAL_IP}:8080/restaurants`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result) {
          // setOwnerData(result.data[0]);
          setData(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);


  // signup owner 
  const signUpOwner = async (newOwner) => {
    try {
      const res = await axios.post(`http://${LOCAL_IP}:8080/restaurants/owners`, newOwner);
      const getUpdated = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
      if (getUpdated) {
        setData(getUpdated.data);
        return res.data.success;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // add food
  const addFood = async (newFoodInfo) => {
    try {
      const result = await axios.put(`http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/foods`, newFoodInfo);
      if (result) {
        const response = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
        setData(response.data);

        let newOwnerData = { ...ownerData };
        newOwnerData.foods.push(newFoodInfo);
        setOwnerData(newOwnerData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // edit food
  const editFood = async (updatedFood) => {
    try {
      const result = await axios.patch(
        `http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/foods/${updatedFood._id}`, updatedFood);
      if (result) {
        const response = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
        setData(response.data);

        let newOwnerData = { ...ownerData };
        for (let each of newOwnerData.foods) {
          if (each._id === updatedFood._id) {
            each.name = updatedFood.name
            each.origin = updatedFood.origin
            each.price = updatedFood.price
            each.image = updatedFood.image
          }
        }
        setOwnerData(newOwnerData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //  Delete food
  const deleteFood = async (foodToDelete) => {
    try {
      const result = await axios.delete(
        `http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/foods/${foodToDelete._id}`);

      if (result) {
        const response = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
        setData(response.data);

      }

    } catch (error) {
      console.log(error);
    }
  }

  // Daily Note
  const addDailyNote = async (newDailyNote) => {
    try {
      const result = await axios.put(
        `http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/notes`, newDailyNote);
      if (result) {
        const response = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
        setData(response.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // edit note
  const editDailyNote = async (updatedNote) => {
    try {
      const result = await axios.patch(
        `http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/notes/${updatedNote._id}`, updatedNote);

      if (result) {
        const response = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
        setData(response.data);

        let newOwnerData = { ...ownerData };
        for (let each of newOwnerData.notes) {
          if (each._id === updatedNote._id) {
            each.header = updatedNote.header;
            each.comment = updatedNote.comment;
          }
        }
        setOwnerData(newOwnerData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // delete note
  const deleteDailyNote = async (deletedNote) => {
    try {
      const result = await axios.delete(
        `http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/notes/${deletedNote._id}`);

      if (result) {
        const response = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
        setData(response.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // personal profile
  const editPersonalProfile = async (updatedProfile) => {
    try {
      const result = await axios.patch(
        `http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/profile`, updatedProfile);
      if (result) {
        const response = await axios.get(`http://${LOCAL_IP}:8080/restaurants`);
        setData(response.data);

        let newOwnerData = { ...ownerData };
        newOwnerData.fullName = updatedProfile.fullName;
        newOwnerData.phoneNumber = updatedProfile.phoneNumber
        newOwnerData.password = updatedProfile.password
        newOwnerData.address = updatedProfile.address
        setOwnerData(newOwnerData);
      }
    } catch (error) {
      console.log(error);
    }
  }

// Delete account
  const deleteOwnerAccount = async () =>{
    try {
      const result = await axios.delete(`http://${LOCAL_IP}:8080/restaurants/owners/${ownerData._id}/profile`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider value={{foodsList, setFoodsList, token, data, setData, signUpOwner, ownerData, setOwnerData, addFood, editFood, deleteFood, addDailyNote, editDailyNote, deleteDailyNote, editPersonalProfile, deleteOwnerAccount }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
