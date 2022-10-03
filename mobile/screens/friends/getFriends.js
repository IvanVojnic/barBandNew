import React, {useEffect, useState} from "react";
import {View, Text, FlatList} from "react-native";
import {getFriends} from "../../core/api/API";
import Checkbox from "../../assets/checkBox"
import {stylesFriend} from "../../assets/stylesFriends";

const GetFriends = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null)
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState(null)
    const [friendsArrLen, setFriendsArrLen] = useState(0)
    const [friendsCheckedList, setFriendsCheckedList] = useState([])

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

    return (
        <View>
            {isLoaded ? message ? <span>message</span> :
                    <View>
                        {
                            friends.map((item) => (
                                <View style={stylesFriend.friendsList}>
                                <Checkbox onPress={() => {selectUser(item.id)}}
                                friendsArr={friendsCheckedList}
                                friendsArrLen={friendsArrLen}
                                title={item.email}
                                friendId={item.id}
                                />
                                </View>
                            ))
                        }
                    </View>
                : <span>{error}</span>}
        </View>
    )
}

/*
<ul>
                {friends.map(friend => (
                    <li>
                        <Checkbox/>
                        <Text key={friend.id}>
                            {`${friend.name}, ${friend.email}`}
                        </Text>
                    </li>
                ))}
            </ul>
* */

export default GetFriends

