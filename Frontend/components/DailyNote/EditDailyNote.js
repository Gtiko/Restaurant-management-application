import { useContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableHighlight } from "react-native";
import { GlobalContext } from "../GlobalContext";

export default function EditNote({ navigation, route }) {

    const { editDailyNote } = useContext(GlobalContext);

    const { item } = route.params;

    const dateNow = new Date().toLocaleDateString();
    const [state, setState] = useState({ _id: item._id, date: dateNow, header: item.header, comment: item.comment });

    const onUpdateNote = () => {
        editDailyNote(state);
        navigation.goBack();
    }

    return (
        
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

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

                <TouchableHighlight onPress={onUpdateNote} style={styles.button}>
                    <Text style={styles.buttonText}>Update Note</Text>
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
