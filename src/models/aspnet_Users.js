const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('aspnet_Users', {
    ApplicationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      primaryKey: true,
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
      defaultValue: null,
    },
    IsAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    LastActivityDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'aspnet_Users',
    timestamps: false,
  });
};
