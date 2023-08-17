import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DisplayProfile from "./DisplayProfile";
import EditProfile from "./EditProfile";

const Stack = createNativeStackNavigator();

export default function PersonalProfile() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Display-profile" component={DisplayProfile}/>
            <Stack.Screen name="Edit-profile" component={EditProfile}/>
        </Stack.Navigator>
    );
}

