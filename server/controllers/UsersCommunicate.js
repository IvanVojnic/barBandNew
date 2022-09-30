import User from '../models/user.js';
import Friends from '../models/friends.js';
import sequelize from "../utils/database.js";

/*export const sendUsers = (req,res,next) => {
    Friends.findOne({
        where :{},
        include: [{
          where: {
              userReceiver : User.dataValue.id,
              status : 'request',
          },
          association : Friends
        }]
    }).then(listOfFriends =>{
        if (listOfFriends){
            console.log(kk);
            res.status(200).json(listOfFriends);
        }
    })
}*/

export const sendUsers = async (req, res, next) => {
    const [results, metadata] = await sequelize.query(
        `SELECT users.id, users.email, users.name FROM users JOIN friends ON users.id = ${req.body.id} AND friends.status = 'request'`
    );

    console.log(JSON.stringify(results, null, 2));

    /*User.findAll({
        include : {
            model : Friends,
            where : {
                userReceiver : User.findByPk("id"),
                status : "request",
            }
        }
    }).then(listFr => {
        if (listFr){
            console.log("fr")
            return res.status(200).json(listFr);
        }
    })*/
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
