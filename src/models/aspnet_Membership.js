const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('aspnet_Membership', {
    ApplicationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    Password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    PasswordSalt: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(256),
    },
    IsApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    IsLockedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    LastLoginDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'aspnet_Membership',
    timestamps: false,
  });
};
