import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
import Invites from "./invites.js";

const Status = sequelize.define('status', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Status;
