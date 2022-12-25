import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';
import Invites from "./invites.js";

const Status = sequelize.define('statuses', {
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

export const statusAmount = async () => {
    console.log("+++++++++++++++++++++++++")
    const [statuses, metadata] = await sequelize.query(
        `SELECT * FROM statuses`
    );
    return statuses.length;
}

export default Status;
