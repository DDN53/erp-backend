const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ADM_ProcessGroups = sequelize.define(
    "ADM_ProcessGroups",
    {
      GroupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ModuleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      GroupCode: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      GroupName: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      ToolTip: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OrderById: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Expanded: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "ADM_ProcessGroups",
      timestamps: false,
    }
  );

  ADM_ProcessGroups.associate = (models) => {
    ADM_ProcessGroups.belongsTo(models.ADM_Module, {
      foreignKey: "ModuleId",
      as: "module",
    });
    ADM_ProcessGroups.hasMany(models.ADM_Process, {
      foreignKey: "GroupId",
      as: "process",
    });
  };

  return ADM_ProcessGroups;
};
