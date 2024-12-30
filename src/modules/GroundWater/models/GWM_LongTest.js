const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_LongTest = sequelize.define('GWM_LongTest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wellNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  testDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  pid: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  swl: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  adr: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  pwl: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  recPeriod: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  recWl: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  storativity: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  transmissivity: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  bValue: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  cValue: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'GWM_LongTest',
  timestamps: false,
});

// Define associations if necessary
GWM_LongTest.associate = (models) => {
  GWM_LongTest.belongsTo(models.GWM_WellId, {
    foreignKey: 'wellNo',
    targetKey: 'wellNo',
  });
};

module.exports = GWM_LongTest;