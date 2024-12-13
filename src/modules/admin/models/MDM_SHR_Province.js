const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SHR_Province = sequelize.define(
    "MDM_SHR_Province",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      Description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CountryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_SHR_Province",
      timestamps: false,
    }
  );

  MDM_SHR_Province.associate = (models) => {
    MDM_SHR_Province.belongsTo(models.MDM_SHR_Country, {
      foreignKey: "CountryId",
      as: "country",
    });
  };

  return MDM_SHR_Province;
};
