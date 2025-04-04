import React, { useContext, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CartContext } from '../contexts/ShopContext';
import { GlobalStyles } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';


export default function ShopScreen() {
  const { products, addItem } = useContext(CartContext);
  const [expandedItemId, setExpandedItemId] = useState<Number | null>(null);

  const toggleDescription = (itemId:Number) => {
    setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemStyle}>
            <View style={styles.containerone}>
              <Image 
                source={{ uri: item.image }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.priceContainer}>Rs {item.price}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => toggleDescription(item.id)}>
                <Text style={styles.text}>
                  {expandedItemId === item.id ? 'HIDE ' : 'SHOW DESCRIPTION'}
                </Text>
              </TouchableOpacity>
              {expandedItemId === item.id && (
                <Text style={styles.description}>{item.description}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={() => addItem(item)}>
                <Ionicons name="add-circle-outline" size={20} color="#ffff" />
                <Text style={styles.text}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  description:{
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    padding: 16,
    backgroundColor: GlobalStyles.colors.eggplant,
    borderRadius: 5,
    textAlign: "center",
  },
  priceContainer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.2,
    marginBottom: 10,
  },
  containerone: {
    backgroundColor: "white",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: Dimensions.get("window").width * 0.6,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  itemStyle: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.amethyst,
    paddingVertical: 10,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    backgroundColor: GlobalStyles.colors.eggplant,
    padding: 12,
    flexDirection: "row",
    margin: 10,
    gap: 10,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 5,
    justifyContent: "center",
  },
  text: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});