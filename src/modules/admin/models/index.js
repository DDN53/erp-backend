const Sequelize = require("sequelize");
// const sequelize = require("../../config/database");
const sequelize = require("../../../../config/database");

const models = {
  ADM_ServerUser: require("./ADM_ServerUser")(sequelize, Sequelize.DataTypes),
  ADM_Module: require("./ADM_Module")(sequelize, Sequelize.DataTypes),
  ADM_TaskList: require("./ADM_TaskList")(sequelize, Sequelize.DataTypes),
  ADM_Process: require("./ADM_Process")(sequelize, Sequelize.DataTypes),
  ADM_ProcessGroups: require("./ADM_ProcessGroups")(
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
