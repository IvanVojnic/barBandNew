import User from '../models/user.js';
import Friends from '../models/friends.js';
import sequelize from "../utils/database.js";
import Rooms from "../models/rooms.js";
import Invites from "../models/invites.js";

export const acceptInvite = async (req, res, next) => {

}

export const getRooms = async (req, res, next) => {
    const userId = req.body.userId
    await Rooms.findAll({
        where: {
            idUserCreator: userId
        }, raw: true, attributes:["idUserCreator", "id", "date", "place"]
    }).then(rooms => {
        console.log(rooms)
        return res.status(200).json(rooms);

    })
}

export const sendInvite = async (req, res, next) => {
    const userId = req.body.userSender
    const newRoom = await Rooms.create({
        idUserCreator: Number(userId),
        date: "2022-10-10",
        place: "place"
    }).then(console.log("room created"))
        .catch((e) => {
            console.log(e)
        })
    console.log(newRoom.id)
    req.body.friendsList.forEach(function (friend) {
        Invites.create({
            statusId: Number(2),
            userId: Number(friend),
            roomId: Number(newRoom.id)
        }).then(console.log("invite created"))
    })
    return res.status(200).json('invite sends');
}
