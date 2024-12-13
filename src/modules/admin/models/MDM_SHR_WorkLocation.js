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

  MDM_SHR_WorkLocation.associate = (models) => {
    // MDM_SHR_WorkLocation.belongsTo(models.MDM_SHR_District, {
    //   foreignKey: "DistrictId",
    //   as: "district",
    // });

    MDM_SHR_WorkLocation.belongsTo(models.MDM_SHR_WorkLocationType, {
      foreignKey: "LocationTypeId",
      as: "locationType",
    });

    MDM_SHR_WorkLocation.hasMany(
      models.MDM_SHR_WorkLocation_CostCentre_Mapping,
      {
        foreignKey: "LocationId",
        as: "costCentreMappings",
      }
    );
  };

  return MDM_SHR_WorkLocation;
};
