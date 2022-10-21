/*import Rooms from "./rooms.js";
import Invites from "./invites.js";
import User from "./user.js";
import Friends from "./friends.js";
import Status from "./status.js";

export const createConnection = (ready) => {
    if (ready){
        console.log("++++++++")
        User.belongsToMany(Rooms, {through: Invites});
        User.hasMany(Friends, {
            foreignKey: 'userReceiver'
        });
        User.hasMany(Friends, {
            foreignKey: 'userSender'
        });
        User.hasMany(Rooms, {
            foreignKey: 'idUserCreator'
        });
        Invites.hasOne(Status)
        Rooms.belongsToMany(User, {through: Invites});
    }
}*/

