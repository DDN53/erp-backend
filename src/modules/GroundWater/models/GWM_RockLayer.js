const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_RockLayer = sequelize.define('GWM_RockLayer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wellNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rockNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  rockFrom: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  rockTo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  rockType: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  colour: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  grainSize: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  weathering: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'GWM_RockLayer',
  timestamps: false,
});

// Define associations if necessary
GWM_RockLayer.associate = (models) => {
  GWM_RockLayer.belongsTo(models.GWM_WellId, {
    foreignKey: 'wellNo',
    targetKey: 'wellNo',
  });
};

module.exports = GWM_RockLayer; 