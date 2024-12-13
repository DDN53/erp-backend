const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_OfficeActType = sequelize.define(
    "MDM_OfficeActType",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      OffcActTypeCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true, // Ensures unique constraint
      },
      Description: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      CircularId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_OfficeActType",
      timestamps: false,
    }
  );

  // Define associations
  MDM_OfficeActType.associate = (models) => {
    MDM_OfficeActType.belongsTo(models.MDM_Circular, {
      foreignKey: "CircularId",
      as: "circular",
    });

    MDM_OfficeActType.hasMany(models.MDM_Employee, {
      foreignKey: "OffcActTypeId",
      as: "employees",
    });
    // Example: If OfficeActType has relations with another entity
    // MDM_OfficeActType.hasMany(models.OfficeAction, {
    //   foreignKey: "OfficeActTypeId",
    //   as: "officeActions",
    // });
  };

  return MDM_OfficeActType;
};
