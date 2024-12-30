const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_Chemical = sequelize.define('GWM_Chemical', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wellNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  sampleDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  sampleDepth: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  sampleTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  turbidity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  ph: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  // Add other fields as per your database schema
}, {
  tableName: 'GWM_Chemical',
  timestamps: false,
});

module.exports = GWM_Chemical; 