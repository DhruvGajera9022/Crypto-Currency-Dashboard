const { sequelize } = require("../config/config");
const { Sequelize } = require("sequelize");

const Currency = sequelize.define("currency", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Currency;

