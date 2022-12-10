import React, {useEffect, useState} from "react";
import {View, TextInput, Text} from "react-native";
import {stylesFriend} from "../../assets/stylesFriends";
import {findFriends, sendRequest} from "../../core/api/API"

const AddFriend = () => {
    const [newFriend, setNewFriend] = useState(null)
    const [newFriendId, setNewFriendId] = useState(null)
    const [isNewFriendLoaded, setIsNewFriendLoaded] = useState(false)
    const [isFindFriendPressed, setIsFindFriendPressed] = useState(false)
    const [email, onChangeEmail] = useState("");

    const findSubmit = (e) => {
        e.preventDefault();
        findFriends(email).then((response) => {
            if (response === 0) {
                setIsNewFriendLoaded(false)
            } else {
                setNewFriend(response)
                setNewFriendId(response.id)
                console.log(response);
                setIsNewFriendLoaded(true)
            }
            setIsFindFriendPressed(true)
        }).catch(error => {
            console.log(error);
        })
    }

    const requestSubmit = (e) => {
        e.preventDefault();
        sendRequest(newFriendId).then((response) => {
            console.log(response);
            alert(response);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
            <View>
                <form onSubmit={findSubmit}>
                    <View>
                        <Text>Find Friend</Text>
                        <TextInput style={stylesFriend.input} placeholder="Ivanov" onChange={() => {onChangeEmail(event.target.value)}}/>
                    </View>
                    <input type="submit" value="Find"/>
                </form>
                {isFindFriendPressed ? isNewFriendLoaded ? <View>
                    {
                        <View>
                            <form onSubmit={requestSubmit}>
                                <label>
                                    <Text>{`${newFriend.name}`}</Text>
                                    <input type="submit" value="Add Friend"/>
                                </label>
                            </form>
                        </View>
                    }
                </View> : <View>friend not found</View> : <div></div>}
            </View>
        )
}

export default AddFriend

