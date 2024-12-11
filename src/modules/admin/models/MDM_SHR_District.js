const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SHR_District = sequelize.define(
    "MDM_SHR_District",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
      },
      Description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ProvinceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_SHR_District",
      timestamps: false,
    }
  );

  // Associations
  MDM_SHR_District.associate = (models) => {
    // Define a foreign key relationship between MDM_SHR_District and MDM_SHR_Province
    MDM_SHR_District.belongsTo(models.MDM_SHR_Province, {
      foreignKey: "ProvinceId", // The foreign key field in MDM_SHR_District
      as: "province", // Alias for the relationship
    });
  };

  return MDM_SHR_District;
};
