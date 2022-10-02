import React from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";

const Notifications = ({navigation, route}) => {
    const { response } = route.params;
    console.log(response)
    return(
        <View><Text>AAA</Text>
            <View>
                <form onSubmit={response}>
                    <label>
                        <Text>{`${response.name}`}</Text>
                        <input type="submit" value="Add Friend"/>
                    </label>
                </form>
            </View>
        </View>
    )
}


export default Notifications;
