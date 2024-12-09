const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ADM_TaskUser_Mapping = sequelize.define(
    "ADM_TaskUser_Mapping",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      TaskId: {
        type: DataTypes.INTEGER,
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
      EmpId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CreatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "ADM_TaskUser_Mapping",
      timestamps: false,
    }
  );

  ADM_TaskUser_Mapping.associate = (models) => {
    ADM_TaskUser_Mapping.belongsTo(models.ADM_TaskList, {
      foreignKey: "TaskId",
      as: "task",
    });
    ADM_TaskUser_Mapping.belongsTo(models.ADM_Process, {
      foreignKey: "ProcessId",
      as: "process",
    });
    ADM_TaskUser_Mapping.belongsTo(models.ADM_ProcessGroups, {
      foreignKey: "GroupId",
      as: "processGroup",
    });
    ADM_TaskUser_Mapping.belongsTo(models.ADM_Module, {
      foreignKey: "ModuleId",
      as: "module",
    });
  };

  return ADM_TaskUser_Mapping;
};
