import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Status = sequelize.define('status', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Status;
