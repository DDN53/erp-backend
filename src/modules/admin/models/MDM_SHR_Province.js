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

  // Associations
  MDM_SHR_Province.associate = (models) => {
    // Define a foreign key relationship between MDM_SHR_Province and MDM_SHR_Country
    MDM_SHR_Province.belongsTo(models.MDM_SHR_Country, {
      foreignKey: "CountryId", // The foreign key field in MDM_SHR_Province
      as: "country", // Alias for the relationship
    });
  };

  return MDM_SHR_Province;
};
