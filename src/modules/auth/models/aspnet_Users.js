const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AspNetUsers = sequelize.define(
    "AspNetUsers",
    {
      ApplicationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      UserName: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      LoweredUserName: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      MobileAlias: {
        type: DataTypes.STRING(16),
        allowNull: true,
        defaultValue: null,
      },
      IsAnonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      LastActivityDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "aspnet_Users",
      timestamps: false,
    }
  );

  AspNetUsers.associate = (models) => {
    AspNetUsers.hasOne(models.AspNetMembership, {
      foreignKey: "UserId",
      as: "membership",
    });
  };

  return AspNetUsers;
};
