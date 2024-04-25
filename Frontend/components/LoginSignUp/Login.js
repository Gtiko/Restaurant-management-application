import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
} from "react-native";
import { useContext, useState } from "react";
import AsyncLocalStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../GlobalContext";
import { KEY, LOCAL_IP } from "../config/constant";


export default function Login({ navigation }) {
  const [state, setState] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState(false);
  const { data, setOwnerData , setFoodsList} = useContext(GlobalContext);

  const goToSignUp = () => {
    navigation.navigate("SingUp");
  };

  const onLogin = async () => {
    try {
      const result = await fetch(`http://${LOCAL_IP}:8080/restaurants/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const rst = await result.json();

      if (rst.success === false) {
        setMsg(true);
        setTimeout(() => {
          setMsg(false);
        }, 3000);
      }
      if (rst.success === true) {
        try {
          await AsyncLocalStorage.setItem(KEY, JSON.stringify(rst.data));
          navigation.navigate("MainPage");
          let user = data.find(user => user.username === state.username)
          setOwnerData(user);
          setFoodsList(user.foods);
          setState({ username: "", password: "" });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text style={styles.loginTitle}>Login</Text>

      {msg && <Text style={styles.msg}> Wrong username or password </Text>}

      <TextInput
        placeholder="username"
        value={state.username}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, username: e })}
      />
      <TextInput
        placeholder="password"
        value={state.password}
        secureTextEntry={true}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, password: e })}
      />
      <TouchableHighlight onPress={onLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={goToSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Don't have account </Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  msg: {
    color: "red",
    fontSize: 15,
    alignSelf: "center",
  },
  loginTitle: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20,
  },
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
