const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_DesignationJobRole = sequelize.define(
    "MDM_DesignationJobRole",
    {
      RoleId: {
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
        allowNull: true, // Nullable field
      },
      Remarks: {
        type: DataTypes.STRING(255),
        allowNull: true, // Nullable field
      },
      OrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "MDM_DesignationJobRole",
      timestamps: false,
    }
  );

  // Define Associations
  MDM_DesignationJobRole.associate = (models) => {
    // MDM_DesignationJobRole.hasMany(models.MDM_Employee, {
    //   foreignKey: "JobRoleId",
    //   as: "employees",
    // });
    
    // Example association: If this table has a many-to-many relationship
    // MDM_DesignationJobRole.belongsToMany(models.Designation, {
    //   through: 'DesignationJobRoleMapping',
    //   foreignKey: 'RoleId',
    //   as: 'designations',
    // });
  };

  return MDM_DesignationJobRole;
};
