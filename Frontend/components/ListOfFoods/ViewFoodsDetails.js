import { SafeAreaView, Text, StyleSheet, Image, View } from "react-native";

export default function ViewFoodDetail({ route }) {

    const { item } = route.params;

    return (
        <SafeAreaView style={styles.edges}>

            <View >
                <Text>
                    {item.image !== "" ?
                        <Image source={{ uri: item.image }} style={styles.image} /> :
                        "no image provided..."}
                </Text>
            </View>

            <View >
                <Text style={styles.title}>  {item.name} </Text>
            </View>
            <View >
                <Text style={styles.title}> Price : ${item.price} </Text>
            </View>
            <View >
                <Text style={styles.title}> Origin : {item.origin} </Text>
            </View>
            <View >
                <Text style={styles.title}>  {item.date} </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
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
        flex: 4,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
    },
    edges: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        minWidth: 50,
    },

});
