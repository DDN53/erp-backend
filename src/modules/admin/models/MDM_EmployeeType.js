const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_EmployeeType = sequelize.define(
    "MDM_EmployeeType",
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
        unique: true, // Enforces the unique constraint
      },
      Remarks: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_EmployeeType",
      timestamps: false, // Assuming no timestamps in the table
    }
  );

  // Define associations
  MDM_EmployeeType.associate = (models) => {
    // Example association (if applicable)
    // MDM_EmployeeType.hasMany(models.Employee, {
    //   foreignKey: "EmployeeTypeId",
    //   as: "employees",
    // });
  };

  return MDM_EmployeeType;
};
