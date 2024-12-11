const Sequelize = require("sequelize");
// const sequelize = require("../../config/database");
const sequelize = require("../../../../config/database");

const models = {
  // ADM_Module: require("./ADM_Module")(sequelize, Sequelize.DataTypes),
  // ADM_ProcessGroups: require("./ADM_ProcessGroups")(
  //   sequelize,
  //   Sequelize.DataTypes
  // ),
  AspNetUsers: require("./aspnet_Users")(sequelize, Sequelize.DataTypes),
  AspNetMembership: require("./aspnet_Membership")(
    sequelize,
    Sequelize.DataTypes
  ),
};

// Initialize associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
