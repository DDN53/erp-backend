const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const HRM_EmpPersonal = sequelize.define(
    "HRM_EmpPersonal",
    {
      Pkey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PlaceOfBirth: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AppointmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ConfirmationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ProbationPeriodInMonths: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProbationPeriodInYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AnticipatedDateOfRetirement: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      NationalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CivilStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ReligionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      EmployeeName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      EmployeeNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      BirthCertificateNumber: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      NationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CasualAppointmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ContractAppointmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      EmployeeFullName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Initials: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      SurName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ProjectAppointmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ProjectExtentionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "HRM_EmpPersonal",
      timestamps: false,
    }
  );

  HRM_EmpPersonal.associate = (models) => {
    // Association with Nationality
    // HRM_EmpPersonal.belongsTo(models.HRM_Common_Nationality, {
    //   foreignKey: "NationalityId",
    //   as: "nationality",
    // });
    // Association with Religion
    // HRM_EmpPersonal.belongsTo(models.HRM_Common_Religion, {
    //   foreignKey: "ReligionId",
    //   as: "religion",
    // });
    // Association with CivilStatus
    // HRM_EmpPersonal.belongsTo(models.HRM_Common_CivilStatus, {
    //   foreignKey: "CivilStatusId",
    //   as: "civilStatus",
    // });
    // Association with Nation
    // HRM_EmpPersonal.belongsTo(models.HRM_Common_Nation, {
    //   foreignKey: "NationId",
    //   as: "nation",
    // });
  };

  return HRM_EmpPersonal;
};
