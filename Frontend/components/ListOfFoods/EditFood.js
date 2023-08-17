import { useContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableHighlight, Image, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from "../GlobalContext";

export default function EditFood({ navigation, route }) {
    const {data, editFood, setOwnerData, ownerData } = useContext(GlobalContext);

    const { item } = route.params;

    const [state, setState] = useState(
        { _id: item._id, name: item.name, origin: item.origin, price: item.price, image: item.image });

    const onLoadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
        if (result.assets !== null || result.assets) {
            setState({ ...state, image: result.assets[0].uri });
        }
    }

    const onUpdate = () => {
        editFood(state);
        navigation.goBack();
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }} >

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
                value={state.price.toString()}
                keyboardType="number-pad"
                style={styles.inputBox}
                onChangeText={(e) => setState({ ...state, price: e })}
            />

            <Image source={{ uri: state.image }} style={styles.image} />

            <TouchableHighlight onPress={onLoadImage} style={styles.button}>
                <Text style={styles.buttonText}>Upload image</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={onUpdate} style={styles.button}>
                <Text style={styles.buttonText}>Update Food</Text>
            </TouchableHighlight>
        </ScrollView>

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
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
    }
});
