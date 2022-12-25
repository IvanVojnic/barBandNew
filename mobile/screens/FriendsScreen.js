import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import AddFriend from "./friends/addFriend";
import GetFriends from "./friends/getFriends";
import {useForm} from "react-hook-form";
import {stylesFriend} from "../assets/stylesFriends";

const FriendsScreen = ({navigation}) => {
    const buttonBackHandler = () => {
        navigation.navigate('MainScreen');
    }


    return (
        <View style={stylesFriend.Friend}>
            <Text>Friends Page</Text>
            <View style={stylesFriend.butFriendsWrapper}>
                <TouchableOpacity style={stylesFriend.buttonFriends} onPress={buttonBackHandler}>
                    <Text style={stylesFriend.buttonFriendsText}>Back to main page</Text>
                </TouchableOpacity>
            </View>
            <AddFriend/>
            <GetFriends isModal={false}/>
        </View>
    );
}

export default FriendsScreen;
