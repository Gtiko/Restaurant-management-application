import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDailyNote from "./AddDailyNote";
import ListOfNotes from "./ListOfNotes";
import EditNote from "./EditDailyNote";
import ViewNotes from "./ViewNote";

const Stack = createNativeStackNavigator();

export default function DailyNote(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="List-Of-notes" component={ListOfNotes}/>
            <Stack.Screen name="Add-daily-note" component={AddDailyNote}/>
            <Stack.Screen name="Edit-daily-note" component={EditNote}/>
            <Stack.Screen name="View-daily-note" component={ViewNotes}/>
        </Stack.Navigator>
    )
}