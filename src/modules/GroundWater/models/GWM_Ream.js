const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_Ream = sequelize.define('GWM_Ream', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wellNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
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
}, {
  tableName: 'GWM_Ream',
  timestamps: false,
});

// Define associations if necessary
GWM_Ream.associate = (models) => {
  GWM_Ream.belongsTo(models.GWM_WellId, {
    foreignKey: 'wellNo',
    targetKey: 'wellNo',
  });
};

module.exports = GWM_Ream; 