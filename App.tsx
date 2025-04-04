import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from './screens/CartScreen';
import ShopScreen from './screens/ShopScreen';
import CartContextProvider from './contexts/ShopContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <SafeAreaProvider>
        <CartContextProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Shop" component={ShopScreen} />
              <Tab.Screen name="Cart" component={CartScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </CartContextProvider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#ffff32', // Remove or change if needed
  },
});