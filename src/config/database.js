const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Bắt buộc sử dụng SSL
            rejectUnauthorized: false, // Tùy chọn này bỏ qua việc xác thực chứng chỉ (nếu cần)
        },
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;