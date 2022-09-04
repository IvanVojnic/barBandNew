import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {stylesFriend} from "../../assets/stylesFriends";

const AddFriend = () => {

    const [search, setSearch] = useState(false)
    const [newFriend, setNewFriend] = useState(null)
    const [isNewFriendLoaded, setIsNewFriendLoaded] = useState(null)
    const [isFindFriendPressed, setIsFindFriendPressed] = useState(false)
    const [isSendRequest, setIsSendRequest] = useState(null)
    const [text, onChangeText] = useState("Useless Text");


   /* useEffect(() => {
        if(search){
            alert("hello")
            fetch("http://localhost:5000/findFriend")
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result === 0) {
                            setIsNewFriendLoaded(false)
                        } else {
                            setIsNewFriendLoaded(true)
                            setNewFriend(result)
                            console.log(result);
                        }
                        setIsFindFriendPressed(true)
                    },
                )
            setSearch(false)
        }
    }, [search])

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
                <form onSubmit={() => {setSearch(true)}}>
                    <label>
                        Find Friend
                        <input type="text" value={text} onChange={onChangeText}/>
                    </label>
                    <input type="submit" value="Find"/>
                </form>
                {isFindFriendPressed ? isNewFriendLoaded ? <ul>
                    {newFriend.map(newItem => (
                        <li>
                            <form onSubmit={() => {setIsSendRequest(true)}}>
                                <label>
                                    {`${newItem.name}`}
                                    <input type="text" value={"hello"}/>
                                </label>
                                <input type="submit" value="Add Friend"/>
                            </form>
                        </li>
                    ))}
                </ul> : <span>friend not found</span> : <div></div>}
            </View>
        )
}

export default AddFriend

