const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ADM_Module = sequelize.define(
    "ADM_Module",
    {
      ModuleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ModuleCode: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ModuleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      WelcomeMessage: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ModuleImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      PageLink: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      OrderById: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "ADM_Module",
      timestamps: false,
    }
  );

  ADM_Module.associate = (models) => {
    ADM_Module.hasMany(models.ADM_ProcessGroups, {
      foreignKey: "ModuleId",
      as: "processGroups",
    });
  };

  return ADM_Module;
};
