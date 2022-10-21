import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {getFriends, sendInvite} from "../../core/api/API";
import Checkbox from "../../assets/checkBox"
import {stylesFriend} from "../../assets/stylesFriends";


const GetFriends = (isModal) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null)
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState(null)
    const [friendsArrLen, setFriendsArrLen] = useState(0)
    const [friendsCheckedList, setFriendsCheckedList] = useState([])
    const [isShowButton, setIsShowButton] = useState(false)

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

    useEffect(() => {
        if(friendsArrLen!=0){
            setIsShowButton(true)
        } else {
            setIsShowButton(false)
        }
        console.log(friendsCheckedList)
    }, [friendsArrLen])

    function selectUser(id) {
        let itemIndex = friendsCheckedList.indexOf(id)
        if(itemIndex !== -1) {
            friendsCheckedList.splice(itemIndex, 1)
            setFriendsCheckedList(friendsCheckedList)
            setFriendsArrLen(friendsArrLen-1)
        } else {
            friendsCheckedList.push(id)
            setFriendsCheckedList(friendsCheckedList)
            setFriendsArrLen(friendsArrLen+1)
        }
    }

    const sendInviteHandler = (e) => {
        e.preventDefault();

        sendInvite(friendsCheckedList).then((response) => {
            console.log(response);
        })
    }

    return (
        <View>
            {isShowButton &&
            <TouchableOpacity style={stylesModalWindowButton.button} onPress={sendInviteHandler}>
                <Text style={stylesModalWindowButton.buttonInviteText}>send invite</Text>
            </TouchableOpacity>
            }
            {isLoaded ? message ? <span>message</span> :
                    <View>
                        {(isModal.isModal == true) ?
                            friends.map((item) => (
                                <View style={stylesFriend.friendsList}>
                                     <Checkbox onPress={() => {selectUser(item.id)}}
                                                         friendsArr={friendsCheckedList}
                                                         friendsArrLen={friendsArrLen}
                                                         title={item.email}
                                                         friendId={item.id}
                                    />
                                </View>
                            )) : friends.map((item) => (
                                <View style={stylesFriend.friendsList}>
                                    <Text>{item.email}</Text>
                                </View>
                            ))
                        }
                    </View>
                : <span>{error}</span>}
        </View>
    )
}

const stylesModalWindowButton = StyleSheet.create({
    button: {
        zIndex: 2,
        backgroundColor:'fff',
        border: '3px solid #9d0cff',
        borderRadius: '15px',
        boxSizing: 'borderBox',
        minWidth: '30px',
        fontSize:'20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonInviteText:{
        padding: '10px',
        color: '#000',
        fontSize: '30px'
    }
})

export default GetFriends

