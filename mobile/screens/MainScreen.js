import React from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";

const Main = ({navigation}) => {
    const buttonFriendsHandler = () => {
        navigation.navigate('FriendsScreen');
    }
    return (
        <View style={stylesMain.main}>
            <TouchableOpacity style={stylesMain.buttonMain} onPress={buttonFriendsHandler}>
                <Text style={stylesMain.buttonMainText}>Friends</Text>
            </TouchableOpacity>
        </View>
    );
}

const stylesMain = StyleSheet.create({
    main:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonMain:{
        backgroundColor:'#0051ff',
        padding: '10px',
        height: '70px',
        width: '70px',
        borderRadius:'50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonMainText:{
        color:'#ffffff'
    }
})

export default Main;
