import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewFoodDetail from "./ViewFoodsDetails";
import ListOfFoods from "./ListOfFoods";
import EditFood from "./EditFood";
import AddFood from "./AddFoods";

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List-of-foods" component={ListOfFoods} />
      <Stack.Screen name="Add-Food" component={AddFood} />
      <Stack.Screen name="Edit-Food" component={EditFood} />
      <Stack.Screen name="View-Food-Details" component={ViewFoodDetail} />
    </Stack.Navigator>
  );
}
