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

   /* const [data, setData] = useState(null)

    const defaultValues = useMemo(() => ({
        friends: data?.friends || {}
    }))

    const {
        control,
        reset,
        setValue,
        getValues
    } = useForm({defaultValues, mode: 'onBlur'})

    useEffect(() => {
        reset(defaultValues)
    }, [data])*/

    return (
        <View style={stylesFriend.Friend}>
            <Text>Friends Page</Text>
            <View style={stylesFriend.butFriendsWrapper}>
                <TouchableOpacity style={stylesFriend.buttonFriends} onPress={buttonBackHandler}>
                    <Text style={stylesFriend.buttonFriendsText}>Back to main page</Text>
                </TouchableOpacity>
            </View>
            <AddFriend/>
            <GetFriends/>
        </View>
    );
}

export default FriendsScreen;
