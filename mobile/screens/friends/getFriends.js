import React, {useEffect, useState} from "react";
import {View, Text, FlatList} from "react-native";
import {requestGetFriends} from "../../core/api/API";
//import Checkbox from "../../assets/checkBox";
import {stylesFriend} from "../../assets/stylesFriends";
import {Checkbox} from "react-native-paper";

const GetFriends = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null)
    const [friends, setFriends] = useState([]);
    const [isSelected, setSelection] = useState(false);
    const [error, setError] = useState(null)
    const [isFriendSelected, setIsFriendSelected] = useState(false)

    useEffect(() => {
        requestGetFriends().then((response) => {
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

    return (
        <View>
            {isLoaded ? message ? <span>message</span> :
                    <View>
                        {
                            friends.map((item) => (
                                <View style={stylesFriend.friendsList} key={item.id}>
                                    <Checkbox
                                        onPress={() => setIsFriendSelected(!isFriendSelected)}
                                        status={isFriendSelected ? 'checked' : 'unchecked'}
                                        color={'#00ff04'}
                                        uncheckColor={'#fff'}
                                    />
                                    <Text>{item.email}</Text>
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

