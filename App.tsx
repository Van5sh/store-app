import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from './screens/CartScreen';
import ShopScreen from './screens/ShopScreen';
import CartContextProvider from './contexts/ShopContext';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { GlobalStyles } from './constants/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <SafeAreaProvider>
        <CartContextProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel, 
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#ddd',
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === 'All Items') {
                    iconName = 'cart-outline';
                  } else if (route.name === 'Cart') {
                    iconName = 'basket-outline';
                  }
                  return <Ionicons name={iconName as any} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="All Items" component={ShopScreen} />
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
  },
  tabBar: {
    backgroundColor:GlobalStyles.colors.plum,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.charcoal,
    height: 60,
    paddingBottom: 10,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor:  GlobalStyles.colors.charcoal,
    elevation: 5,
    shadowOpacity: 0.3,
  },
  headerTitle: {
    color: GlobalStyles.colors.amethyst,
    fontSize: 18,
    fontWeight: 'bold',
  },
});