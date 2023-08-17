import { useContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from "../GlobalContext";
import uuid from 'react-native-uuid';

export default function AddFood({navigation}) {
    const dateNow = new Date().toLocaleDateString();
    const [state, setState] = useState({ _id: uuid.v1(), name: "", origin: "", price: "", date: dateNow, image: "" });
    // const [state, setState] = useState({ name: '', origin: '', price: "", date: dateNow, image: "" });
    const { addFood, ownerData, setOwnerData } = useContext(GlobalContext);

    const onLoadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (result.assets !== null || result.assets) {
            setState({ ...state, image: result.assets[0].uri });
        }
    }

    const onAddFood = () => {
        addFood(state);
        navigation.goBack();

        // let newOwnerData = {...ownerData};
        // newOwnerData.foods.push(state);
        // setOwnerData(newOwnerData);

        console.log("food added...");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} >

            <TextInput
                placeholder="name"
                value={state.name}
                style={[styles.inputBox, { marginTop: 30 }]}
                onChangeText={(e) => setState({ ...state, name: e })}
            />
            <TextInput
                placeholder="origin"
                value={state.origin}
                style={styles.inputBox}
                onChangeText={(e) => setState({ ...state, origin: e })}
            />
            <TextInput
                placeholder="price"
                value={state.price}
                style={styles.inputBox}
                onChangeText={(e) => setState({ ...state, price: e })}
            />
            <TouchableHighlight onPress={onLoadImage} style={styles.button}>
                <Text style={styles.buttonText}>Upload image</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={onAddFood} style={styles.button}>
                <Text style={styles.buttonText}>Add Food</Text>
            </TouchableHighlight>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginTitle: {
        fontSize: 25,
        color: "#444",
        textAlign: "center",
        margin: 20,
    },
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
