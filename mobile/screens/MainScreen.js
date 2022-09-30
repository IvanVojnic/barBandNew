import React from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";

const Main = ({navigation}) => {
    const buttonFriendsHandler = () => {
        navigation.navigate('FriendsScreen');
    }
    const buttonNotifications = () => {
        navigation.navigate('NotificationsScreen');
    }
    return (
        <View style={stylesMain.main}>
            <View style={stylesMain.butFriendsWrapper}>
                <TouchableOpacity style={stylesMain.buttonFriends} onPress={buttonNotifications}>
                    <Text style={stylesMain.buttonFriendsText}>Notifications</Text>
                </TouchableOpacity>
            </View>
            <View style={stylesMain.butFriendsWrapper}>
                <TouchableOpacity style={stylesMain.buttonFriends} onPress={buttonFriendsHandler}>
                    <Text style={stylesMain.buttonFriendsText}>Friends</Text>
                </TouchableOpacity>
            </View>
            <View style={stylesMain.butInviteWrapper}>
                <TouchableOpacity style={stylesMain.buttonInvite}>
                    <View style={stylesMain.insideButtonCircle}>
                    <Text style={stylesMain.buttonInviteText}>Invite</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const stylesMain = StyleSheet.create({
    main:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'start',
        alignItems: 'center',
        position: 'relative'
    },
    butFriendsWrapper:{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonFriends:{
        backgroundColor:'fff',
        border: '3px solid #9d0cff',
        borderRadius: '15px',
        boxSizing: 'borderBox',
        minWidth: '120px',
        fontSize:'20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFriendsText:{
        padding: '10px',
        color: '#000',
        fontSize: '30px'
    },
    butInviteWrapper:{
        width: '100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonInvite:{
        backgroundColor: '#4A7A4C',
        padding: '10px',
        height: '120px',
        width: '120px',
        borderRadius:'50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '5px 5px 10px 1px rgba(0, 0, 0, .4)'
    },
    buttonInviteText:{
        color: '#ffeeee',
        fontSize: '30px',
        fontWeight: '500'
    },
    insideButtonCircle:{
        padding:'5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90px',
        height:'90px',
        borderRadius: '50%',
        border: '1px solid #14A588',
        backgroundColor: '#14A51C'
    }
})

export default Main;
