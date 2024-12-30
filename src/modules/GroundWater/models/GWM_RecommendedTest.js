const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_RecommendedTest = sequelize.define('GWM_RecommendedTest', {
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
    allowNull: true,
  },
  pid: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  dr: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  pwl: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  pd: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  basedOn: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'GWM_RecommendedTest',
  timestamps: false,
});

// Define associations if necessary
GWM_RecommendedTest.associate = (models) => {
  GWM_RecommendedTest.belongsTo(models.GWM_WellId, {
    foreignKey: 'wellNo',
    targetKey: 'wellNo',
  });
};

module.exports = GWM_RecommendedTest; 