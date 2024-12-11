const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SHR_CostCentre = sequelize.define(
    "MDM_SHR_CostCentre",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CostCentreCode: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      CostCentreName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ConsolidationLocationID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      IsProjects: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      IsExpired: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      CadreNormId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_SHR_CostCentre",
      timestamps: false,
    }
  );

  // Associations
  MDM_SHR_CostCentre.associate = (models) => {
    // Define a foreign key relationship between MDM_SHR_CostCentre and MDM_SHR_Consolidation_Locations
    MDM_SHR_CostCentre.belongsTo(models.MDM_SHR_Consolidation_Locations, {
      foreignKey: "ConsolidationLocationID", // The foreign key field in MDM_SHR_CostCentre
      as: "consolidationLocation", // Alias for the relationship
    });
  };

  return MDM_SHR_CostCentre;
};