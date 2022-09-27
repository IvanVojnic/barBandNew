import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
import Friends from "./friends.js";
/*import FriendsSender from "./friendsSender.js";
import FriendsReceiver from "./friendsReceiver.js";*/

const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   name: {
      type: Sequelize.STRING,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});
User.hasMany(Friends, {
   foreignKey: 'userReceiver'
})
User.hasMany(Friends, {
   foreignKey: 'userSender'
})
export default User;
