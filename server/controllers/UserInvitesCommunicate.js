import User from '../models/user.js';
import Friends from '../models/friends.js';
import sequelize from "../utils/database.js";
import Rooms from "../models/rooms.js";
import Invites from "../models/invites.js";

export const acceptInvite = async (req, res, next) => {
    const userId = req.body.userId
    const roomId = req.body.roomId
    const status = req.body.status
    const [statusId, metadata2] = await sequelize.query(
        `SELECT id FROM STATUSES WHERE STATUSES.status = ${status}`
    );
    console.log(statusId)
    console.log(status)
    console.log(roomId)
    const [invite, metadata1] = await sequelize.query(
        `UPDATE INVITES SET INVITES.statusId = ${statusId[0].id} WHERE INVITES.userId = ${userId} AND INVITES.roomId = ${roomId}`
    );
    return res.status(200).json('invite submit sent');
}


export const getRooms = async (req, res, next) => {
    let result = {
        "rooms" : [
                {
                    "room": {},
                    "users": []
                }
        ]
    }
    console.log("_____1______")
    const userId = req.body.userId
    const [rooms1, metadata1] = await sequelize.query(
        `SELECT ROOMS.id, ROOMS.idUserCreator, ROOMS.date, ROOMS.place, USERS.name, USERS.email FROM ROOMS INNER JOIN USERS on USERS.id = ${userId} WHERE ROOMS.idUserCreator = ${userId}`
    );
    console.log("_____2______")

    const [rooms2, metadata2] = await sequelize.query(
        `SELECT ROOMS.id, ROOMS.idUserCreator, ROOMS.date, ROOMS.place, USERS.name, USERS.email, STATUSES.status FROM ROOMS INNER JOIN INVITES on INVITES.roomId = ROOMS.id AND INVITES.userId = ${userId} INNER JOIN USERS on USERS.id = ROOMS.idUserCreator INNER JOIN statuses on STATUSES.id = INVITES.statusId`
    );
    console.log("_____3______")

    for(let i = 0; i < rooms1.length; i++){
        rooms2.push(rooms1[i])
    }
    console.log("_____4______")
    console.log(rooms2)

    for(let i = 0; i < rooms2.length; i++){
        const [users1, metadataU1] = await sequelize.query(
            `SELECT USERS.name, USERS.email, INVITES.statusId FROM USERS INNER JOIN INVITES on INVITES.userId = USERS.Id WHERE INVITES.roomId = ${rooms2[i].id}`
        )
        result.rooms.push({"room": rooms2[i], users: users1})
    }
    result.rooms.splice(0,1)

    console.log(JSON.stringify("_________result__________"));
    console.log(JSON.stringify(result));
    return res.status(200).json(result);
}

export const sendInvite = async (req, res, next) => {
    const userId = req.body.userSender
    const newRoom = await Rooms.create({
        idUserCreator: Number(userId),
        date: "2022-10-10",
        place: "place"
    }).then()
        .catch((e) => {
            console.log(e)
        })
    const [statusId, metadataU3] = await sequelize.query(
        'SELECT id FROM STATUSES WHERE status = 0'
    )
    console.log(statusId)
    req.body.friendsList.forEach(function (friend) {
        Invites.create({
            statusId: Number(statusId[0].id),
            userId: Number(friend),
            roomId: Number(newRoom.id)
        })
    })
    return res.status(200).json('invite sends');
}
