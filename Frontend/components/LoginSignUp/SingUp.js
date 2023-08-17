import { SafeAreaView, StyleSheet, TextInput, TouchableHighlight, Text } from "react-native";
import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

export default function SignUp({ navigation }) {
  const { signUpOwner } = useContext(GlobalContext);
  const [msg, setMsg] = useState(false);
  const [state, setState] = useState(
    { username: "", phoneNumber: "", fullName: "", password: "", address: "", notes: [], foods: [] });

  const onSignUp = async () => {
    let findEmail = await signUpOwner(state);
    if (findEmail) {
      navigation.goBack();
    } else {
      setMsg(true);
      setTimeout(() => { setMsg(false) }, 3000);
    }
  };
  const goToLogin = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} >

      <Text style={styles.loginTitle}>SignUp</Text>

      {msg && <Text style={styles.msg}> This email already exist's </Text>}

      <TextInput
        placeholder="email"
        value={state.username}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, username: e })}
      />
      <TextInput
        placeholder="full name"
        value={state.fullName}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, fullName: e })}
      />
      <TextInput
        placeholder="password"
        value={state.password}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, password: e })}
      />
      <TextInput
        placeholder="phone number"
        value={state.phoneNumber}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, phoneNumber: e })}
      />
      <TextInput
        placeholder="address"
        value={state.address}
        style={styles.inputBox}
        onChangeText={(e) => setState({ ...state, address: e })}
      />
      <TouchableHighlight onPress={onSignUp} style={styles.button}>
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={goToLogin} style={styles.button}>
        <Text style={styles.buttonText}>Already have account</Text>
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
