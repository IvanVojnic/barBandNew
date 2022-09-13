import {StyleSheet} from "react-native";

export const stylesFriend = StyleSheet.create({
    Friend:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'start',
        alignItems: 'center',
        position:'relative'
    },
    friendsList:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputField:{
        padding:'5px',
        margin: '20px',
        border: '2px solid #000'
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
    checkbox: {
        alignSelf: "center",
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
    }
})
