import User from '../models/user.js';
import Friends from '../models/friends.js';

export const sendUsers = (req,res,next) => {
    User.findAll(
        {raw:true,
            attributes:["email", "id", "name"]}).then(dbUsers => {
        if (dbUsers) {
            console.log(dbUsers)
            return res.status(200).json(dbUsers);
        }
    })
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
