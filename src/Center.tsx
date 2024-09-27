import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

//screens
import Details from './Details';
import Booking from './Booking';
import Home from './Home';
import Settings from './Settings';


const Center = () => {
    //bottom tab navigator for home, details, booking and settings pages
    const Tab = createBottomTabNavigator();
    return (
        //bottom tab navigator with home, details, booking and settings screens
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (route.name === 'Details') {
                    iconName = focused ? 'grid' : 'grid-outline';
                }
                else if (route.name === 'Booking') {
                    iconName = focused ? 'bookmarks' : 'bookmark-outline';
                }
                else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            tabBarActiveBackgroundColor: "rgb(240, 219, 255)"
        })}
        >

            <Tab.Screen name="Home" component={Home} options={{ title: "Latest Events" }} />
            <Tab.Screen name="Details" component={Details} options={{ title: "Event Details" }} />
            <Tab.Screen name="Booking" component={Booking} options={{ title: "Recent Bookings" }} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default Center

