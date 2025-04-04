import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '../contexts/ShopContext';
import { GlobalStyles } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { cartItems, deleteItem } = useContext(CartContext);
  const finalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const renderItem = ({ item }) => (
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
      <Text style={styles.priceContainer}>Quantity: {item.quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={() => deleteItem(item.id)}>
        <Text style={styles.text}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Price: Rs {finalPrice.toFixed(2)}</Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>NO ITEMS IN CART</Text>
          <Ionicons name="cart" size={200} color={GlobalStyles.colors.eggplant} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.lilac,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.lilac,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.eggplant,
    textAlign: 'center',
    marginBottom: 20,
  },
  containerone: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width * 0.6,
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.2,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  priceContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  itemStyle: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.amethyst,
    paddingVertical: 10,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: GlobalStyles.colors.eggplant,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.4,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: GlobalStyles.colors.eggplant,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    padding: 16,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: GlobalStyles.colors.eggplant,
    borderRadius: 5,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});