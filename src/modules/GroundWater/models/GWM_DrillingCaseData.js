const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_DrillingCaseData = sequelize.define('GWM_DrillingCaseData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wellNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  caseNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  slotSize: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  caseFrom: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  caseTo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  diameter: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'GWM_DrillingCaseData',
  timestamps: false,
});

// Define associations if necessary
GWM_DrillingCaseData.associate = (models) => {
  GWM_DrillingCaseData.belongsTo(models.GWM_WellId, {
    foreignKey: 'wellNo',
    targetKey: 'wellNo',
  });
};

module.exports = GWM_DrillingCaseData; 