import User from '../models/user.js';
import Friends from '../models/friends.js'

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
            return res.status(200).json(friend);
        }
    })
}

/*export const testReq = (req, res, next) => {
    Friends.create({
        user1id : '1',
        user2id : '2',
        status : 'request',
    }).then(record => {
        if (record) {
            return res.status(200).json(record);
        }
    })
}*/

export const sendReq = (req, res, next) => {
     let userSender = req.body.userSender;
     let userReciever = req.body.userReciever;
     Friends.create({
         user1id : userSender,
         user2id : userReciever,
         status : 'request'
     }).then(message =>{
         if (message) {
             return res.status(200).json('users successfully added to Friends table ');
         }
     })

}