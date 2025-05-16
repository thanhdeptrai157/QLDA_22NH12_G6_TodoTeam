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
       logging: false, 
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
// sequelize
//     .sync()
//     .then(() => {
//         console.log('Database & tables created!');
//     })
//     .catch((err) => {
//         console.error('Unable to create the database & tables:', err);
//     });
module.exports = sequelize;