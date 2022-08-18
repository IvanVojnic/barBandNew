import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodetest', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
});

export default sequelize;
