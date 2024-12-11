const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_Employee = sequelize.define(
    "MDM_Employee",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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

  // Define associations
  MDM_Employee.associate = (models) => {
    // MDM_Employee belongs to MDM_DesignationJobRole
    MDM_Employee.belongsTo(models.MDM_DesignationJobRole, {
      foreignKey: "JobRoleId",
      as: "jobRole",
    });

    // MDM_Employee belongs to MDM_OfficeActType
    MDM_Employee.belongsTo(models.MDM_OfficeActType, {
      foreignKey: "OffcActTypeId",
      as: "officeActType",
    });
 };

  return MDM_Employee;
};
