const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SHR_WorkLocationType = sequelize.define(
    "MDM_SHR_WorkLocationType",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_SHR_WorkLocationType",
      timestamps: false,
    }
  );

  MDM_SHR_WorkLocationType.associate = (models) => {
    // MDM_SHR_WorkLocationType.hasMany(models.MDM_Employee, {
    //   foreignKey: "WorkLocationTypeId",
    //   as: "employees",
    // });

    MDM_SHR_WorkLocationType.hasMany(models.MDM_SHR_WorkLocation, {
      foreignKey: "LocationTypeId",
      as: "workLocations",
    });
  };

  return MDM_SHR_WorkLocationType;
};
