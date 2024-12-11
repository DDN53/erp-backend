const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_Employee = sequelize.define(
    "MDM_Employee",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      EmpNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      EmpName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Basic: {
        type: DataTypes.DECIMAL(19, 5),
        allowNull: false,
      },
      SalaryScaleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      EmpTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      DsgnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BoardGradeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      EmpStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      DeptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      LocationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CostCenterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PayStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      OffcActTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SalCodeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SalaryScaleCasualId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SOBoardId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SODesgnId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      DepartmentStructId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IsCompensatoryAllow: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      IsTaxconcessioned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      JobRoleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_Employee",
      timestamps: false,
    }
  );

  MDM_Employee.associate = (models) => {
    // Define relationships with other models here, if necessary.
    MDM_Employee.belongsTo(models.MDM_DesignationJobRole, {
      foreignKey: "JobRoleId",
      as: "jobRole",
    });
    MDM_Employee.belongsTo(models.MDM_OfficeActType, {
      foreignKey: "OffcActTypeId",
      as: "officeActType",
    });
    MDM_Employee.belongsTo(models.MDM_SalaryScale, {
      foreignKey: "SalaryScaleId",
      as: "salaryScale",
    });
    MDM_Employee.belongsTo(models.MDM_EmployeeType, {
      foreignKey: "EmpTypeId",
      as: "employeeType",
    });
    MDM_Employee.belongsTo(models.MDM_EmployeeStatus, {
      foreignKey: "EmpStatusId",
      as: "employeeStatus",
    });
    MDM_Employee.belongsTo(models.MDM_Department, {
      foreignKey: "DeptId",
      as: "department",
    });
    MDM_Employee.belongsTo(models.MDM_Location, {
      foreignKey: "LocationId",
      as: "location",
    });
    MDM_Employee.belongsTo(models.MDM_CostCenter, {
      foreignKey: "CostCenterId",
      as: "costCenter",
    });
  };

  return MDM_Employee;
};
