const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ADM_TaskList = sequelize.define(
    "ADM_TaskList",
    {
      TaskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ProcessId: {
        type: DataTypes.INTEGER,
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
      TaskName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      HashTaskName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      TaskURL: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      HashTaskURL: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OrderById: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "ADM_TaskList",
      timestamps: false,
    }
  );

  ADM_TaskList.associate = (models) => {
    ADM_TaskList.belongsTo(models.ADM_Process, {
      foreignKey: "ProcessId",
      as: "process",
    });
    ADM_TaskList.belongsTo(models.ADM_ProcessGroups, {
      foreignKey: "GroupId",
      as: "processGroups",
    });
    ADM_TaskList.belongsTo(models.ADM_Module, {
      foreignKey: "ModuleId",
      as: "module",
    });
  };

  return ADM_TaskList;
};
