const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ADM_ServerUser = sequelize.define(
    "ADM_ServerUser",
    {
      AdminId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      PasswordHash: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      PasswordSalt: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      Role: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "Admin",
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      LastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "ADM_ServerUser",
      timestamps: false,
    }
  );
  return ADM_ServerUser;
};
