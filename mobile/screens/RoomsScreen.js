import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import {getRooms, acceptInvite} from "../core/api/API";

const Rooms = ({navigation}) => {

    const [rooms, setRooms] = useState([]);
    const [isRoomsLoaded, setIsRoomsLoaded] = useState(false);

    useEffect(() => {
        getRooms().then((response) => {
            console.log(response)
            setRooms(response)
            setIsRoomsLoaded(true)
        }).catch((e) => {
            console.log(e)
        })
    }, [])


    const inviteSubmit = (roomId) => {
        acceptInvite().then((response) => {
            console.log(response)
        }).catch((e) => {
            console.log(e)
        })
    }

    return(
        <View>
            <View>
                {
                    isRoomsLoaded ? <View>
                        {
                            rooms.map((room) => (
                                <View>
                                    <View>{room.date}</View>
                                    <View>{room.place}</View>
                                    <View>{room.idUserCreator}</View>
                                </View>
                            ))
                        }
                    </View> : <View></View>
                }
            </View>
        </View>
    )
}

export default Rooms;
