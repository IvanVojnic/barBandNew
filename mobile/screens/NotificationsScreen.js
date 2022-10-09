import React from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import {acceptRequestFriends} from "../core/api/API";

const Notifications = ({navigation, route}) => {
    const { response } = route.params;
    const acceptSubmit = (id, e) => {
        e.preventDefault();
        acceptRequestFriends(id).then((response) => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }
    console.log(response)
    return(
        <View>
            <View>
                {
                    response.map((item) => (
                <form onSubmit={(e) => acceptSubmit(item.id, e)}>
                    <label>
                        <Text>{item.name}</Text>
                        <input type="submit" value="Add Friend"/>
                    </label>
                </form>
                    ))
                }
            </View>
        </View>
    )
}


export default Notifications;
