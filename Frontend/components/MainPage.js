import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import PersonalProfile from "./PersonalProfile/PersonalProfile";
import DailyNote from "./DailyNote/DailyNote";
import Home from "./ListOfFoods/Home";

const BottomTabs = createMaterialBottomTabNavigator();

export default function MainPage() {
  return (
    <BottomTabs.Navigator
      activeColor="#fff"
      inactiveColor="gray"
      barStyle={{ backgroundColor: "#0f1e74" }}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="#4cc2bd" size={26} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Daily-note"
        component={DailyNote}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="note" color="#4cc2bd" size={26} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Personal-profile"
        component={PersonalProfile}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color="#4cc2bd" size={26} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
