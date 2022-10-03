import React from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";

const Notifications = ({navigation, route}) => {
    const { response } = route.params;
    const acceptSubmit = (id, e) => {
        e.preventDefault();

    }
    console.log(response)
    return(
        <View><Text>AAA</Text>
            <View>
                {
                    response.map((item) => (
                <form onSubmit={(e) => acceptSubmit(item.id, e)}>
                    <label>
                        <Text>{`${item.name}`}</Text>
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
