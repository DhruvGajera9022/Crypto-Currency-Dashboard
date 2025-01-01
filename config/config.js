const { Sequelize, DataType } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql',
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log("Database Connected"))
    .catch(() => console.error("Unable to connect to the database:", err))

sequelize.sync({ alter: true });

module.exports = { sequelize, DataType }