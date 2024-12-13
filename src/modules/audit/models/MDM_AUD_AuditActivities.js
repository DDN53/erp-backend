const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MDM_AUD_AuditActivities = sequelize.define(
    "MDM_AUD_AuditActivities",
    {
      auditActivityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      auditActivityName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      auditYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "MDM_AUD_AuditActivities",
      timestamps: false,
    }
  );

  // Associations
  MDM_AUD_AuditActivities.associate = (models) => {
    // Define associations here if needed
  };

  return MDM_AUD_AuditActivities;
};
