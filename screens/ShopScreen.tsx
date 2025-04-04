import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { CartContext } from '../contexts/ShopContext';

export default function ShopScreen() {
  const { addItem } = useContext(CartContext);

  return (
    <View >
      <Text>Shop Items</Text>
      <Button title="Add Item" onPress={() => addItem({ title: 'New Item', price: 19.99 })} />
    </View>
  );
}
