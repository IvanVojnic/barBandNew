import User from '../models/user.js';
import Friends from '../models/friends.js';
import sequelize from "../utils/database.js";
import Rooms from "../models/rooms.js";
import Invites from "../models/invites.js";

export const acceptInvite = async (req, res, next) => {

}

export const getRooms = async (req, res, next) => {
    const myRooms = [];
    let userRooms = null;
    let userInvites = null;
    const userId = req.body.userId;
    console.log("====================================");
    Rooms.findAll({
        where: {
            idUserCreator: userId
        }, raw: true, attributes:["idUserCreator", "id", "date", "place"]
    }).then(rooms => {
        userRooms = rooms;
    })

    let invites = await Invites.findAll({
        where: {
            userId: userId
        }, raw: true, attributes:["id", "statusId", "userId", "roomId"]
    }).then(invites => {
        userInvites = invites;
    })

    userRooms.forEach(room => {
        myRooms.push({
            statusId: Number(2),
            userId: Number(userId),
            roomId: Number(room.id)
        })
    })
    userInvites.forEach(invite => {
        myRooms.push({
            statusId: Number(invite.statusId),
            userId: Number(invite.userId),
            roomId: Number(invite.roomId)
        })
    })
    myRooms.forEach(room  => {
        Rooms.findOne({where: {id: room.roomId}})
            .then(room=>{
                if(!room) return;
                console.log("_____________");
                console.log(room.dataValues);
                console.log("_____________");
                room.getUsers().then(users=>{
                    for(user of users){
                        console.log("course:", user.name);
                    }
                });
            });
    })

   /* const [resultsReceiver, metadata] = await sequelize.query(
        `SELECT * FROM rooms WHERE rooms.id LEFT JOIN invites ON rooms.id = invites.roomId`
    );
    console.log(resultsReceiver)*/
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
