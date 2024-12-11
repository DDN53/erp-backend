const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SHR_WorkLocation = sequelize.define(
    "MDM_SHR_WorkLocation",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Address: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ParentLocationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      LocationTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      DistrictId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_SHR_WorkLocation",
      timestamps: false,
    }
  );

  // Associations
  MDM_SHR_WorkLocation.associate = (models) => {
    // MDM_SHR_WorkLocation belongs to MDM_SHR_District
    MDM_SHR_WorkLocation.belongsTo(models.MDM_SHR_District, {
      foreignKey: "DistrictId", // Foreign key field in MDM_SHR_WorkLocation
      as: "district", // Alias for the relationship
    });

    // MDM_SHR_WorkLocation belongs to MDM_SHR_WorkLocationType
    MDM_SHR_WorkLocation.belongsTo(models.MDM_SHR_WorkLocationType, {
      foreignKey: "LocationTypeId", // Foreign key field in MDM_SHR_WorkLocation
      as: "locationType", // Alias for the relationship
    });
  };

  return MDM_SHR_WorkLocation;
};
