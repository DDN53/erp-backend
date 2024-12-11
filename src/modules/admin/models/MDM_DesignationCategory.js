const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_DesignationCategory = sequelize.define(
    "MDM_DesignationCategory",
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
        unique: true,
      },
      Remarks: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      IsTransfer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      DsgnOccuId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_DesignationCategory",
      timestamps: false,
    }
  );

  // Associations
  MDM_DesignationCategory.associate = (models) => {MDM_DesignationCategory.belongsTo(models.MDM_DesignationOccupation, {
      foreignKey: "DsgnOccuId",  
      as: "designationOccupation", 
    });
  };

  return MDM_DesignationCategory;
};
