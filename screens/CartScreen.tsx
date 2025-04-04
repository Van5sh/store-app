import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { CartContext } from '../contexts/ShopContext';

export default function CartScreen() {
  const { cartItems, deleteItem } = useContext(CartContext);

  return (
    <View style={{flex:1,backgroundColor:"#ffff32"}}>
      <Text>Cart Items</Text>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <View key={item.id}>
            <Text>{item.title} - ${item.price}</Text>
            <Button title="Remove" onPress={() => deleteItem(item.id)} />
          </View>
        ))
      ) : (
        <Text>No items in cart</Text>
      )}
    </View>
  );
}
