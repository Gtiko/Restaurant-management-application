import { Text, StyleSheet, SafeAreaView, TouchableHighlight, FlatList, View, Button, ScrollView } from "react-native";
import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

export default function ListOfNotes({ navigation }) {

    const { ownerData, deleteDailyNote } = useContext(GlobalContext);
    const [dailyNotes, setDailyNote] = useState(ownerData.notes)

    const onAddDailyNote = () => {
        navigation.navigate("Add-daily-note");
    }
    const onViewNote = (item) => {
        navigation.navigate("View-daily-note", { item });
    }
    const onEdit = (item) => {
        navigation.navigate("Edit-daily-note", { item });
    }

    const onDelete = (item) => {
        deleteDailyNote(item);
        setDailyNote(dailyNotes.filter(note => note._id !== item._id));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

            <TouchableHighlight
                onPress={onAddDailyNote}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}> Add Daily Note </Text>
            </TouchableHighlight>

            <FlatList
                data={dailyNotes}
                renderItem={({ item }) =>
                    <View style={styles.row}>

                        <Text style={styles.foodsList}>
                            <Button title={item.header + " " + item.date} onPress={() => onViewNote(item)} />
                        </Text>

                        <View style={styles.edges}>
                            <TouchableHighlight
                                onPress={() => onEdit(item)}
                                style={styles.editDeleteBtn}
                            >
                                <Text style={styles.editDeleteBtnText}> Edit</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => onDelete(item)}
                                style={[styles.editDeleteBtn, { backgroundColor: "red" }]}
                            >
                                <Text style={[styles.editDeleteBtnText, { color: "white" }]}>Delete</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>

    )
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
    foodsList: {
        flexDirection: "column",
        alignSelf: "center",
        flex: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        overflow: "hidden",
        marginRight: 20,
    },
    edges: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        minWidth: 50,
    },
    inputBox: {
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        margin: 5,
        borderRadius: 5,
    },
    addButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#0066cc",
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    addButtonText: {
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center",
    },
    editDeleteBtn: {
        borderWidth: 1,
        borderColor: "#0066CC",
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: "#fff",
        margin: 1,
        width: "100%"
    },
    editDeleteBtnText: {
        color: "#0066CC",
        fontSize: 12,
        textAlign: "center",
    },
});
