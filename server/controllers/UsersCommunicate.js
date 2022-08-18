import User from '../models/user.js';

import {response} from "express";

export const findUser = (req, res, next) => {
    req.on("data", email => {
        User.findOne({where: {email: "data"}})
            .then(email => {
                User.findOne({
                    where:
                        {
                            email: "data",
                            id: "userId"
                        }
                }).then(users => {
                    console.log(users);
                    let dataUser = users;
                })
                if (!email) return console.log("User not found");
            }).catch(err => console.log(err))
    });
    res.on("end", () =>{
        //response.json(dataUser);
    });
}

