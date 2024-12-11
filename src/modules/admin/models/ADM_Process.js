const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ADM_Process = sequelize.define(
    "ADM_Process",
    {
      ProcessId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      GroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ModuleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProcessCode: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ProcessName: {
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
      tableName: "ADM_Process",
      timestamps: false,
    }
  );

  ADM_Process.associate = (models) => {
    ADM_Process.belongsTo(models.ADM_Module, {
      foreignKey: "ModuleId",
      as: "module",
    });
    ADM_Process.belongsTo(models.ADM_ProcessGroups, {
      foreignKey: "GroupId",
      as: "processGroups",
    });
    ADM_Process.hasMany(models.ADM_TaskList, {
      foreignKey: "ProcessId",
      as: "task",
    });
  };

  return ADM_Process;
};
