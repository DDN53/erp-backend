const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_WellId = sequelize.define('GWM_WellId', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wellNo: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  oldWellNo: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  nWellNo: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  provinceCode: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  districtCode: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  projOfficeCode: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  dsDivision: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  gsDivision: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  electDivision: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  village: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  xCoordinate: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  yCoordinate: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  mapUsed: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  mapScale: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  geologicalUsed: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  geologicalScale: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  xMetric: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  yMetric: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  elevationMsl: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  userType: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  schemeName: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  elvMethod: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  depSoil: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  depHwRock: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  depWRock: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  geol: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  isLock: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  RSCLocation: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ScaleGeologyMap: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  WellType: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  WellCondition: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
 
}, {
  tableName: 'GWM_WellId', 
  timestamps: false, 
});

// Add foreign key associations
GWM_WellId.associate = (models) => {
  GWM_WellId.belongsTo(models.MDM_LocationHierarchy, {
    foreignKey: 'districtCode',
    targetKey: 'code',
  });
  GWM_WellId.belongsTo(models.MDM_LocationHierarchy, {
    foreignKey: 'projOfficeCode',
    targetKey: 'code',
  });
  GWM_WellId.belongsTo(models.MDM_LocationHierarchy, {
    foreignKey: 'provinceCode',
    targetKey: 'code',
  });
};

module.exports = GWM_WellId; 