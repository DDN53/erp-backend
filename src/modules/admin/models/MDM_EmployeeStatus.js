const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_EmployeeStatus = sequelize.define(
    "MDM_EmployeeStatus",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING(250),
        allowNull: false, // Not nullable field
      },
      Remarks: {
        type: DataTypes.STRING(200),
        allowNull: false, // Not nullable field
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Nullable field
      },
    },
    {
      tableName: "MDM_EmployeeStatus",
      timestamps: false, // Assuming no timestamps needed for this table
    }
  );

  // Define associations (if any)
  MDM_EmployeeStatus.associate = (models) => {};

  return MDM_EmployeeStatus;
};
