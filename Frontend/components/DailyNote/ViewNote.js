import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function ViewNotes({ route }) {
    const { item } = route.params;
    return (
        <SafeAreaView >
            <Text style={[styles.title, {textAlign:"center"}]}> {item.header} </Text>
            <Text style={styles.title}> Date:  {item.date} </Text>
            <Text style={styles.title}> Comment : {item.comment} </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        margin: 10,
        textAlign: "left",
        borderBottomWidth: 1,
    },
});
