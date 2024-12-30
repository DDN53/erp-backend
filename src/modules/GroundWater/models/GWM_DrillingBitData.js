const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_DrillingBitData = sequelize.define('GWM_DrillingBitData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wellNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  bitOrder: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bitNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  bitDia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  bitDepth: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  reamOrder: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reamNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  diaReam: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  depReam: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  bitFrom: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  bitTo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  bitEndDia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'GWM_DrillingBitData',
  timestamps: false,
});

// Define associations if necessary
GWM_DrillingBitData.associate = (models) => {
  GWM_DrillingBitData.belongsTo(models.GWM_WellId, {
    foreignKey: 'wellNo',
    targetKey: 'wellNo',
  });
};

module.exports = GWM_DrillingBitData; 