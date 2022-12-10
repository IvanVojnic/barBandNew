import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
import Status from "./status.js";

const Invites = sequelize.define('invites', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});
Status.hasOne(Invites, { onDelete: "cascade"})


export default Invites;
