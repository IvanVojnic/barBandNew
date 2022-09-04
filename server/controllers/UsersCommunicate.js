import User from '../models/user.js';
import Friends from '../models/friends.js'

export const sendUsers = (req,res,next) => {
    User.findAll(
        {raw:true,
            attributes:["email", "id", "name"]}).then(dbUsers => {
        if (dbUsers) {
            return res.status(200).json(dbUsers);
        }
    })
}

export const testReq = (req, res, next) => {
    Friends.create({
        user1id : '1',
        user2id : '2',
        status : 'request',
    }).then(record => {
        if (record) {
            return res.status(200).json(record);
        }
    })
}
