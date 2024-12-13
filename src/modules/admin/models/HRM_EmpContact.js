const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const HRM_EmpContact = sequelize.define(
    "HRM_EmpContact",
    {
      Pkey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      HouseNo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Street: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Locality: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      City: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      PhoneNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      EmailID: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ZipCode: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      MobileNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      AddressTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      EmpPersonalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProvinceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CountryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      EmpContactId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SimNo: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "HRM_EmpContact",
      timestamps: false,
    }
  );

  HRM_EmpContact.associate = (models) => {
    // Associations
    // HRM_EmpContact.belongsTo(models.HRM_EmpPersonal, {
    //   foreignKey: "EmpPersonalId",
    //   as: "empPersonal",
    // });

    // HRM_EmpContact.belongsTo(models.HRM_EmployeeProfile, {
    //   foreignKey: "EmpContactId",
    //   as: "empContactProfile",
    // });

    // HRM_EmpContact.belongsTo(models.HRM_Common_AddressType, {
    //   foreignKey: "AddressTypeId",
    //   as: "addressType",
    // });

    // HRM_EmpContact.belongsTo(models.MDM_SHR_Province, {
    //   foreignKey: "ProvinceId",
    //   as: "province",
    // });

    // HRM_EmpContact.belongsTo(models.MDM_SHR_Country, {
    //   foreignKey: "CountryId",
    //   as: "country",
    // });
  };

  return HRM_EmpContact;
};
