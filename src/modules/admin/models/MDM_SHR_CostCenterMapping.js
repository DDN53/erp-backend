const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SHR_CostCenterMapping = sequelize.define(
    "MDM_SHR_CostCenterMapping",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CostCenter: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ObjVersion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_SHR_CostCenterMapping",
      timestamps: false,
    }
  );

  // Associations
  MDM_SHR_CostCenterMapping.associate = (models) => {
    // Define a foreign key relationship between MDM_SHR_CostCenterMapping and MDM_SHR_CostCentre
    MDM_SHR_CostCenterMapping.belongsTo(models.MDM_SHR_CostCentre, {
      foreignKey: "CostCenter",  // The foreign key field in MDM_SHR_CostCenterMapping
      as: "costCentre",  // Alias for the relationship
    });
  };

  return MDM_SHR_CostCenterMapping;
};
