const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const HRM_EmpSocialSecurity = sequelize.define(
    "HRM_EmpSocialSecurity",
    {
      Pkey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      NICNumber: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      NicIssueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      IDCardNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      IDCardExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      PersonalFileCode: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      PassportNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      PassportIssueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      PassportExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      PlaceOfPassportIssue: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      NationalityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SubjectClerkNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      EmpPersonalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ImagePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ImageName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "HRM_EmpSocialSecurity",
      timestamps: false,
    }
  );

  HRM_EmpSocialSecurity.associate = (models) => {
    // Associations
    // HRM_EmpSocialSecurity.belongsTo(models.HRM_EmpPersonal, {
    //   foreignKey: "EmpPersonalId",
    //   as: "empPersonal",
    // });
    // HRM_EmpSocialSecurity.belongsTo(models.HRM_Common_Nationality, {
    //   foreignKey: "NationalityId",
    //   as: "nationality",
    // });
  };

  return HRM_EmpSocialSecurity;
};
