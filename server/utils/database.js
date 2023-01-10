import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('logindb', 'root', 'Rekbr345', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    }
});

export default sequelize;