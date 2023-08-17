import { useContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableHighlight } from "react-native";
import { GlobalContext } from "../GlobalContext";
import uuid from 'react-native-uuid';

export default function AddDailyNote({ navigation }) {
    const {ownerData, setOwnerData, addDailyNote } = useContext(GlobalContext);
    const dateNow = new Date().toLocaleDateString();
    const [state, setState] = useState({ _id: uuid.v1(), date: dateNow, header: "", comment: "" });

    const onAddNote = () => {
        addDailyNote(state);

        let newOwnerData = {...ownerData};
        newOwnerData.notes.push(state);
        setOwnerData(newOwnerData);

        navigation.goBack();
    }

    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} >
            
            <TextInput
                placeholder="header"
                value={state.header}
                style={[styles.inputBox, { marginTop: 30 }]}
                onChangeText={(e) => setState({ ...state, header: e })}
            />
            <TextInput
                placeholder="comment"
                multiline={true}
                value={state.comment}
                style={styles.inputBox}
                onChangeText={(e) => setState({ ...state, comment: e })}
            />

            <TouchableHighlight onPress={onAddNote} style={styles.button}>
                <Text style={styles.buttonText}>Add Note</Text>
            </TouchableHighlight>

        </SafeAreaView>
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
