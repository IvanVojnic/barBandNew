import User from '../models/user.js';

import sequelize from "../utils/database.js";

export const getPushToken = (req, res)=>{
    let pushToken = req.body.pushToken;
    User.create(({
          pushToken: pushToken,
        }
    )).then(() => {
        res.status(200).json({message: "token created"});
        console.log("token created");
    })


}