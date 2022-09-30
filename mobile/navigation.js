import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from "react-native";
import { AuthScreen, MainScreen, FriendsScreen, Notifications } from './screens';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function (){
        return <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="AuthScreen"
                    component={AuthScreen}
                    options={{title: 'login'}}
                />
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{title: 'main'}}
                />
                <Stack.Screen
                    name="FriendsScreen"
                    component={FriendsScreen}
                    options={{title: 'friends'}}
                />
                <Stack.Screen
                    name="NotificationsScreen"
                    component={Notifications}
                    options={{title: 'Notifications'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
}
