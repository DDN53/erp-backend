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

  MDM_SHR_District.associate = (models) => {
    MDM_SHR_District.belongsTo(models.MDM_SHR_Province, {
      foreignKey: "ProvinceId",
      as: "province",
    });
  };

  return MDM_SHR_District;
};
