const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_Circular = sequelize.define(
    "MDM_Circular",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      CircularCode: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      CircularName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      CircularDescription: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      CircularDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_Circular",
      timestamps: false, // Assuming no created_at/updated_at columns
    }
  );

  // Define associations (if needed)
  MDM_Circular.associate = (models) => {
    // If MDM_Circular has any associations (e.g., to other models), define them here.
    // Example:
    // MDM_Circular.belongsTo(models.MDM_Department, {
    //   foreignKey: "DeptId",
    //   as: "department",
    // });
    // You can add more associations as necessary
  };

  return MDM_Circular;
};
