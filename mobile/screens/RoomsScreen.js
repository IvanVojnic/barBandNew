import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import {getRooms, acceptInvite} from "../core/api/API";

const Rooms = ({navigation}) => {

    const [rooms, setRooms] = useState([]);
    const [isRoomsLoaded, setIsRoomsLoaded] = useState(false);
    const [statusAccepted, setStatusAccepted] = useState(false);

    useEffect(() => {
        getRooms().then(async (response) => {
            console.log(response)
            await setRooms(response.rooms)
            console.log(rooms)
            console.log(typeof rooms)
            setIsRoomsLoaded(true)
        }).catch((e) => {
            console.log(e)
        })
    }, [])


    const InviteSubmit = (roomId, status) => {
        console.log(roomId);
        console.log(status);
        acceptInvite(roomId, status).then((response) => {
            alert(response)
        }).catch((e) => {
            console.log(e)
        })
    }

    return(
        <View>
            <View>
                {
                    isRoomsLoaded && <View>
                        {
                            rooms.map((room) => (
                                <View>
                                    <View>Место:{room.room.place}</View>
                                    <View>Время:{room.room.date}</View>
                                    <View>Имя создателя комнаты:{room.room.name}</View>
                                    <View>Почта создателя комнаты:{room.room.email}</View>
                                    <View>
                                        <View>Приглашенные пользователи:</View>
                                        {
                                            room.users.map((user) => (
                                                <View>
                                                    <View>Имя:{user.name}</View>
                                                    <View>Почта:{user.email}</View>
                                                </View>
                                            ))
                                        }
                                    </View>
                                    <Button title={"Yes"} onPress={() => {InviteSubmit(room.room.id, 1)}}/>
                                    <Button title={"No"} onPress={() => {InviteSubmit(room.room.id, -1)}}/>
                                </View>
                            ))
                        }
                    </View>
                }
            </View>
        </View>
    )
}

export default Rooms;
