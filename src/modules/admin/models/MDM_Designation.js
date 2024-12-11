const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_Designation = sequelize.define(
    "MDM_Designation",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      ShortDescription: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      Remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      DsgnSumCtgryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      DsgnCtgryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BoardGradeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      OffcActTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      X: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
    },
    {
      tableName: "MDM_Designation",
      timestamps: false,
    }
  );

  MDM_Designation.associate = (models) => {
    MDM_Designation.belongsTo(models.MDM_OfficeActType, {
      foreignKey: "OffcActTypeId",
      as: "officeActType",
    });
    MDM_Designation.belongsTo(models.MDM_DesignationCategory, {
      foreignKey: "DsgnCtgryId",
      as: "designationCategory",
    });
    MDM_Designation.belongsTo(models.MDM_DesignationSummaryCategory, {
      foreignKey: "DsgnSumCtgryId",
      as: "designationSummaryCategory",
    });
    MDM_Designation.belongsTo(models.MDM_BoardGrade, {
      foreignKey: "BoardGradeId",
      as: "boardGrade",
    });
  };

  return MDM_Designation;
};
