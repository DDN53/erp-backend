const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SHR_WorkLocation_CostCentre_Mapping = sequelize.define(
    "MDM_SHR_WorkLocation_CostCentre_Mapping",
    {
      LocationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      CostCentreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "MDM_SHR_WorkLocation_CostCentre_Mapping",
      timestamps: false,
    }
  );

  MDM_SHR_WorkLocation_CostCentre_Mapping.associate = (models) => {
    MDM_SHR_WorkLocation_CostCentre_Mapping.belongsTo(
      models.MDM_SHR_WorkLocation,
      {
        foreignKey: "LocationId",
        as: "workLocation",
      }
    );

    MDM_SHR_WorkLocation_CostCentre_Mapping.belongsTo(
      models.MDM_SHR_CostCentre,
      {
        foreignKey: "CostCentreId",
        as: "costCentre",
      }
    );
  };

  return MDM_SHR_WorkLocation_CostCentre_Mapping;
};
