import { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { GlobalContext } from "../GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY } from "../config/constant";


export default function EditProfile({ navigation, route }) {
  const { editPersonalProfile, deleteOwnerAccount } = useContext(GlobalContext);

  const personalProfile = route.params.ownerData;

  const [state, setState] = useState({
    phoneNumber: personalProfile.phoneNumber,
    username: personalProfile.username,
    password: personalProfile.password,
    fullName: personalProfile.fullName,
    address: personalProfile.address,
  });

  const onUpdate = () => {
    editPersonalProfile(state);
    navigation.goBack();
  };

  const deleteAccount = async () => {
    deleteOwnerAccount();
    navigation.navigate("Login");
    await AsyncStorage.removeItem(KEY);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TextInput
        editable={false}
        placeholder="Email"
        value={state.username}
        style={[styles.inputBox, { marginTop: 30, borderBottomColor: "red" }]}
      />
      <TextInput
        placeholder="phone number"
        value={state.phoneNumber}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, phoneNumber: e })}
      />
      <TextInput
        editable={false}
        placeholder="password"
        value={state.password}
        style={[styles.inputBox, { borderBottomColor: "red" }]}
        onChangeText={(e) => setState({ ...state, password: e })}
      />

      <TextInput
        placeholder="full name"
        value={state.fullName}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, fullName: e })}
      />
      <TextInput
        placeholder="address"
        value={state.address}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, address: e })}
      />

      <TouchableHighlight
        onPress={onUpdate}
        style={[styles.button, { backgroundColor: "#0a5e13" }]}
      >
        <Text style={styles.buttonText}>Update profile</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={deleteAccount}
        style={[styles.button, { backgroundColor: "red" }]}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    padding: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    margin: 10,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: "10%",
    backgroundColor: "#F5F5F5",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: "10%",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});
