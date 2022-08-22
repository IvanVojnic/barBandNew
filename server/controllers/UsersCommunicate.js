import User from "../models/user.js";

export const sendUsers = (req,res,next) => {
    User.findAll({raw:true})
        .then(dbUsers => {
            if (dbUsers) {
                return res.status(200).json(dbUsers);
            }
        })
}
