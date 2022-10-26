import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
import Friends from "./friends.js";
import Rooms from "./rooms.js";
import Invites from "./invites.js";

const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false
   },
   name: {
      type: Sequelize.STRING
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   pushToken: {
      type: Sequelize.STRING,
      allowNull: true,
   }
});
User.hasMany(Friends, {
   foreignKey: 'userReceiver'
});
User.hasMany(Friends, {
   foreignKey: 'userSender'
});
User.hasMany(Rooms, {
   foreignKey: 'idUserCreator'
});

User.belongsToMany(Rooms, {through: Invites});
Rooms.belongsToMany(User, {through: Invites});
export default User;
