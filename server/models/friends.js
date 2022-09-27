import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Friends = sequelize.define('friends' , {
    userSender: {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    userReceiver: {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    status: {
        type : Sequelize.STRING,
        allowNull: false
    }
})

export default Friends
