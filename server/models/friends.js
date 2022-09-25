import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';
import User from "./user.js";

const Friends = sequelize.define('friends' , {
    user1id: {
        type : Sequelize.INTEGER,
        primaryKey: true
    },
    user2id: {
        type : Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type : Sequelize.STRING,
        allowNull: false,
    }
})

export default Friends
