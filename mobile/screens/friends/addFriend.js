import React, {useEffect, useState} from "react";
import {View, TextInput, Text} from "react-native";
import {stylesFriend} from "../../assets/stylesFriends";
import {requestFindFriends} from "../../core/api/API"

const AddFriend = ({navigation}) => {
    //const [search, setSearch] = useState(false)
    const [newFriend, setNewFriend] = useState(null)
    const [isNewFriendLoaded, setIsNewFriendLoaded] = useState(false)
    const [isFindFriendPressed, setIsFindFriendPressed] = useState(false)
    const [isSendRequest, setIsSendRequest] = useState(null)
    const [email, onChangeEmail] = useState("");

   /* useEffect(() => {
        if (search) {
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
        setSearch(false)
    }, [search])*/

    useEffect(() => {
        console.log(email)
    }, [email])

    const handleSubmit = (e) => {
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
/*
    useEffect(() => {
        fetch("http://localhost:5000/addFriend")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result === 0) {

                    } else {

                    }
                },
            )
    }, [isSendRequest])*/

    return (
            <View>
                <form onSubmit={handleSubmit}>
                    <View>
                        <Text>Find Friend</Text>
                        <TextInput style={stylesFriend.input} placeholder="Ivanov" onChange={() => {onChangeEmail(event.target.value)}}/>
                    </View>
                    <input type="submit" value="Find"/>
                </form>
                {isFindFriendPressed ? isNewFriendLoaded ? <View>
                    {
                        <View>
                            <form onSubmit={() => {setIsSendRequest(true)}}>
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

