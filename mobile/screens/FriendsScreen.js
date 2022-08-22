import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity, CheckBox} from "react-native";
import {FlatList} from "react-native-gesture-handler";

const FriendsScreen = ({navigation}) => {
    const buttonBackHandler = () => {
        navigation.navigate('MainScreen');
    }

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isSelected, setSelection] = useState(false);


    useEffect(() => {
        fetch("http://localhost:5000/addFriend")
            .then(res => res.json())
            .then(
                (result) => {
                    if ("error" in result) {
                        setIsLoaded(true);
                        setError(result.error);
                    } else if ("message" in result) {
                        setIsLoaded(true);
                        setMessage(result.message);
                    } else {
                        setIsLoaded(true);
                        setItems(result);
                        console.log(result);
                    }
                },
            )
    }, [])

   if (error) {
        return <View><Text>Ошибка: {error}</Text></View>;
    } else if (!isLoaded) {
        return <View><Text>Загрузка...</Text></View>;
    } else if(message) {
        return <View><Text>Сообщение: {message}</Text></View>;
    } else {
        return (
            <View style={stylesFriend.Friend}>
                <Text>Friends Page</Text>
                <TouchableOpacity style={stylesFriend.buttonFriends} onPress={buttonBackHandler}>
                    <Text style={stylesFriend.buttonFriendText}>Back to main page</Text>
                </TouchableOpacity>
                {isLoaded ? <ul>
                    {items.map(item => (
                        <li>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={stylesFriend.checkbox}
                        />
                            <Text key={item.id}>
                                {`${item.name}, ${item.email}`}
                            </Text>
                        </li>
                    ))}
                </ul> : <span>Loading...</span>}

            </View>
        );
    }
}

const stylesFriend = StyleSheet.create({
    Friend:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFriends:{
        backgroundColor:'#0051ff',
        padding: '10px',
        height: '70px',
        width: '70px',
        borderRadius:'50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFriendText:{
        color:'#ffffff'
    },
    checkbox: {
        alignSelf: "center",
    }
})

export default FriendsScreen;
