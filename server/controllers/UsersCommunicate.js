import User from '../models/user.js';
import Friends from '../models/friends.js';
import sequelize from "../utils/database.js";
import Rooms from "../models/rooms.js";
import Invites from "../models/invites.js";


export const sendInvite = async (req, res, next) => {
    console.log("_________________________");
    const userId = req.body.userSender
    req.body.friendsList.forEach(function (friend) {
        console.log(friend)
    })
    const newRoom = await Rooms.create({
        idUserCreator: userId,
        date: req.body?.date || ' ',
        place: req.body?.place || ' '
    }).then(console.log("room created"))
    console.log(newRoom.id)
    req.body.friendsList.forEach(function (friend) {
        Invites.create({
            statusId: 2,
            userId: friend,
            roomId: newRoom.id
        }).then(console.log("invite created"))
    })
    return res.status(200).json('invite sends');
}

export const acceptFriendsRequest = async (req, res, next) => {
    const [resultsReceiver, metadata] = await sequelize.query(
        `UPDATE friends SET status = 'friends' WHERE userSender = ${req.body.userSender} AND userReceiver = ${req.body.userReceiver}`
    );
    if (resultsReceiver) {
        return res.status(200).json('users successfully added to Friends table');
    }
}

export const sendFriends = async (req, res, next) => {
    const [resultsReceiver, metadata] = await sequelize.query(
        `select USERS.id, USERS.name, USERS.email
             from USERS
             inner join friends f on userReceiver = USERS.id WHERE userSender = ${req.body.id} AND status = 'friends' `
    );
    const [resultsSender, metadata2] = await sequelize.query(
        `select USERS.id, USERS.name, USERS.email
             from USERS
             inner join friends f on userSender = USERS.id WHERE userReceiver = ${req.body.id} AND status = 'friends' `
    );
    for(let i = 0; i < resultsSender.length; i++){
        resultsReceiver.push(resultsSender[i])
    }
    console.log(JSON.stringify(resultsReceiver));
    return res.status(200).json(resultsReceiver);
}

export const sendFriendsRequest = async (req, res, next) => {
    const [resultsReceiver, metadata] = await sequelize.query(
        `select USERS.id, USERS.name, USERS.email
             from USERS
             inner join friends f on userReceiver = USERS.id WHERE userSender = ${req.body.id} AND status = 'request' `
    );
    const [resultsSender, metadata2] = await sequelize.query(
        `select USERS.id, USERS.name, USERS.email
             from USERS
             inner join friends f on userSender = USERS.id WHERE userReceiver = ${req.body.id} AND status = 'request' `
    );
    for(let i = 0; i < resultsSender.length; i++){
        resultsReceiver.push(resultsSender[i])
    }
    console.log(JSON.stringify(resultsReceiver));
    return res.status(200).json(resultsReceiver);
}

export const findUser = (req,res,next) => {
    User.findOne({ where : {
            email: req.body.email
        }, raw: true, attributes:["email", "id", "name"]}).then(friend => {
        if(friend){
            console.log(friend)
            console.log("kkk")
            return res.status(200).json(friend);
        }
    })
}

export const sendReq = (req, res, next) => {
     let userSender = req.body.userSender;
     let userReceiver = req.body.userReceiver;
     console.log("response sent")
     Friends.create({
         userSender : userSender,
         userReceiver : userReceiver,
         status : 'request'
     }).then(message =>{
         if (message) {
             return res.status(200).json('users successfully added to Friends table');
         }
     })
}
