import React, {useEffect, useState} from "react";
import { View, Text} from "react-native";
import {requestGetFriends} from "../../core/api/API";

const GetFriends = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null)
    const [friends, setFriends] = useState([]);
    const [isSelected, setSelection] = useState(false);
    const [error, setError] = useState(null)

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
            {isLoaded ? message ? <span>message</span> : <ul>
                {friends.map(friend => (
                    <li>
                        <CheckBox
                            disabled={false}
                            value={isSelected}
                            onValueChange={(newValue) => setSelection(newValue)}
                        />
                        <Text key={friend.id}>
                            {`${friend.name}, ${friend.email}`}
                        </Text>
                    </li>
                ))}
            </ul> : <span>{error}</span>}
        </View>
    )
}

export default GetFriends

