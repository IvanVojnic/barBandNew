import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Friends = sequelize.define('friends' , {
    user1id: {
        type : Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false,
        foreignKey : true,
    },
    user2id: {
        type : Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
        foreignKey: true,
    },
    status: {
        type : Sequelize.STRING,
        allowNull: false,
    },
    friendship_id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
    }
})
export default Friends
