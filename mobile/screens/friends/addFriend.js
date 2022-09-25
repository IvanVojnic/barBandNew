import React, {useEffect, useState} from "react";
import {View, TextInput, Text} from "react-native";
import {stylesFriend} from "../../assets/stylesFriends";
import {requestFindFriends, sendRequest} from "../../core/api/API"

const AddFriend = () => {
    const [newFriend, setNewFriend] = useState(null)
    const [isNewFriendLoaded, setIsNewFriendLoaded] = useState(false)
    const [isFindFriendPressed, setIsFindFriendPressed] = useState(false)
    const [email, onChangeEmail] = useState("");

    const findSubmit = (e) => {
        e.preventDefault();
        requestFindFriends(email).then((response) => {
            if (response === 0) {
                setIsNewFriendLoaded(false)
            } else {
                setNewFriend(response)
                console.log(response);
                setIsNewFriendLoaded(true)
            }
            setIsFindFriendPressed(true)
        }).catch(error => {
            console.log(error);
        })
    }

    const requestSubmit = (e) => {
        /*e.preventDefault();
        sendRequest(userId).then((response) => {
            console.log(response);
            alert(response);
        }).catch(error => {
            console.log(error);
        })*/
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
                </View> : <span>friend not found</span> : <div></div>}
            </View>
        )
}

export default AddFriend

