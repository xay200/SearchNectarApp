import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './src/screens/SearchScreen';
import FilterScreen from './src/screens/FilterScreen';
import Fontisto from '@expo/vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => <></>;
const CartScreen = () => <></>;
const FavouriteScreen = () => <></>;
const AccountScreen = () => <></>;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Filter"
      component={FilterScreen}
      options={{ headerShown: false,
        tabBarStyle: { display: 'none' },
       }}
      
    />
  </Stack.Navigator>
);

const App = () => {
  return (  
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Shop') {
              return <Fontisto name="shopping-store" size={size} color={color} />;
            } else if (route.name === 'Explore') {
              return <Icon name="search-outline" size={size} color={color} />;
            } else if (route.name === 'Cart') {
              return <Icon name="cart-outline" size={size} color={color} />;
            } else if (route.name === 'Favourite') {
              return <Icon name="heart-outline" size={size} color={color} />;
            } else if (route.name === 'Account') {
              return <Icon name="person" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#00C853',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Shop" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Explore" component={SearchStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Favourite" component={FavouriteScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;