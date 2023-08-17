import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./LoginSignUp/SingUp";
import Login from "./LoginSignUp/Login";

const Stack = createNativeStackNavigator();

export default function LoginPage() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SingUp" component={SignUp} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  }
  
  