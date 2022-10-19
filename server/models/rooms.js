import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
import Invites from "./invites.js";
import User from "./user.js";

const Rooms = sequelize.define('rooms', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUserCreator: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE
    },
    place: {
        type: Sequelize.STRING
    }
});

//Rooms.belongsToMany(User, {through: Invites});


export default Rooms;
