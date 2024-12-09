const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AspNetMembership = sequelize.define(
    "AspNetMembership",
    {
      ApplicationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      PasswordFormat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      PasswordSalt: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      MobilePIN: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      LoweredEmail: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      PasswordQuestion: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      PasswordAnswer: {
        type: DataTypes.STRING(128),
        allowNull: true,
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
      LastPasswordChangedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      LastLockoutDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      FailedPasswordAttemptCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FailedPasswordAttemptWindowStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      FailedPasswordAnswerAttemptCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FailedPasswordAnswerAttemptWindowStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "aspnet_Membership",
      timestamps: false,
    }
  );

  AspNetMembership.associate = (models) => {
    AspNetMembership.belongsTo(models.AspNetUsers, {
      foreignKey: "UserId",
      as: "user",
    });
  };

  return AspNetMembership;
};
