import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Friends = sequelize.define('friends' , {
    user1id: {
        type : Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
    },
    user2id: {
        type : Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
    },
    status: {
        type : Sequelize.STRING,
        allowNull: false,
    }
})
export default Friends
