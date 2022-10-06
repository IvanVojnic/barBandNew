import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import {getFriends} from "../core/api/API";

const SendInviteModal = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null)
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriends().then((response) => {
            if (response === 1) {
                setMessage("You don't have friends")
            } else if (response === 0) {
                setMessage("Error")
            } else {
                setFriends(response)
            }
            setIsLoaded(true)
        }).catch(error => {
            setError(error);
        })

    }, [])

    const buttonCloseModal = () => {

    }

    return (
        <View style={stylesModal.main}>

        </View>
    );
}

const stylesModal = StyleSheet.create({
    main:{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
})

export default SendInviteModal;
