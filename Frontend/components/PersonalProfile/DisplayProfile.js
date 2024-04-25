import { useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { GlobalContext } from "../GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY } from "../config/constant";


export default function DisplayProfile({ navigation }) {
  const { ownerData, setOwnerData } = useContext(GlobalContext);

  const onEdit = () => {
    navigation.navigate("Edit-profile", { ownerData });
  };

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem(KEY);
      navigation.navigate("LoginPage");
      setOwnerData({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <Text style={styles.title}>Profile</Text>

        <View>
          <Text style={styles.row}>{ownerData.fullName}</Text>
          <Text style={styles.row}>{ownerData.username}</Text>
          <Text style={styles.row}>{ownerData.phoneNumber}</Text>
          <Text style={styles.row}>{ownerData.password}</Text>
          <Text style={styles.row}>{ownerData.address}</Text>
        </View>

        <View>
          <TouchableHighlight onPress={onEdit} style={styles.editBtn}>
            <Text style={styles.editBtnText}> Edit Profile</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight onPress={onLogout} style={styles.LogoutButton}>
            <Text style={styles.logoutButtonText}> Logout</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#444",
    textAlign: "center",
    margin: 20,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 5,
  },
  LogoutButton: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#d62a13",
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
  editBtn: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#fff",
    margin: 30,
    alignSelf: "flex-end",
  },
  editBtnText: {
    color: "#0066CC",
    fontSize: 15,
    textAlign: "center",
  },
});
