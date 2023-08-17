import { Text, StyleSheet, SafeAreaView, TextInput, TouchableHighlight, FlatList, View, Image, Button, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";

 export default function ListOfFoods({ navigation }) {
   const {foodsList, setFoodsList, data, ownerData, setOwnerData, deleteFood } = useContext(GlobalContext);
   
   // const [foodsList, setFoodsList] = useState(ownerData.foods);
   const [searchFood, setSearchFood] = useState("");

   const onSearch = (text) => {
      let temp = [...ownerData.foods];
      if (text.length !== 0) {
         temp = temp.filter((item) =>
            item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
         );
      }
      setFoodsList([...temp]);
      setSearchFood(text);
   }
   
   const onAddFood = () => {
      navigation.navigate("Add-Food");
   }

   const onViewFood = (item) => {
      navigation.navigate("View-Food-Details", { item });
   }

   const onEdit = (item) => {
      navigation.navigate("Edit-Food", { item });
   }

   const onDelete = (item) => {
      deleteFood(item);
      setFoodsList(foodsList.filter(food => food._id !== item._id));
      
      let newOwnerData = {...ownerData}
      let remainingFoods = newOwnerData.foods.filter((food) => food._id !== item._id);
      newOwnerData.foods=remainingFoods;
      setOwnerData(newOwnerData);
   }

   return (

      <SafeAreaView>
         <TextInput
            placeholder="Search"
            value={searchFood}
            style={styles.inputBox}
            onChangeText={onSearch}
         />
         <TouchableHighlight
            onPress={onAddFood}
            style={styles.addButton}
         >
            <Text style={styles.addButtonText}> Add food</Text>
         </TouchableHighlight>

         <FlatList
            data={foodsList}
            renderItem={({ item }) =>
               <View style={styles.row}>

                  <Text style={styles.foodsList}>
                     <Button title={item.name + " - $" + item.price} onPress={() => onViewFood(item)} />
                  </Text>

                  <View >
                     <Text>
                        {item.image !== "" ? <Image source={{ uri: item.image }} style={styles.image} /> : "no image provided..."}
                     </Text>
                  </View>

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
