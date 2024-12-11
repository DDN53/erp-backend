const { DataTypes } = require("sequelize");

module.exports.ADM_UserProfile = (sequelize) => {
  return sequelize.define(
    "ADM_UserProfile",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      EmpNo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Name: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      UserType: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Password: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Contact: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      SecurityQuestion: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Answer: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "ADM_UserProfile",
      timestamps: false,
    }
  );
};
