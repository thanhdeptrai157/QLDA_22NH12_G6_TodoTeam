const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: true },
    bio: { type: Sequelize.STRING, allowNull: true },
    phone: { type: Sequelize.STRING },
    role: { type: Sequelize.ENUM('user', 'admin') , defaultValue: 'user' },
    avatarpath: {
        type: Sequelize.STRING,
        field: 'avatarpath',
    },
    coverpath: {
        type: Sequelize.STRING,
        field: 'coverpath',
    }
}, {
    tableName: 'user',
    timestamps: false
});

User.sync();
module.exports = User;
