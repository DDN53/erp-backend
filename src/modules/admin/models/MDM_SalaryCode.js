const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_SalaryCode = sequelize.define(
    "MDM_SalaryCode",
    {
      PKey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      SalCode: {
        type: DataTypes.STRING(50),
        allowNull: true, // Nullable field
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Nullable field
      },
    },
    {
      tableName: "MDM_SalaryCode",
      timestamps: false, // Assuming no timestamps needed for this table
    }
  );

  // Define associations (if any)
  MDM_SalaryCode.associate = (models) => {};

  return MDM_SalaryCode;
};
