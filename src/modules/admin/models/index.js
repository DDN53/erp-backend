const Sequelize = require("sequelize");
// const sequelize = require("../../config/database");
const sequelize = require("../../../../config/database");

const models = {
  //admin related
  ADM_ServerUser: require("./ADM_ServerUser")(sequelize, Sequelize.DataTypes),
  ADM_Module: require("./ADM_Module")(sequelize, Sequelize.DataTypes),
  ADM_ProcessGroups: require("./ADM_ProcessGroups")(
    sequelize,
    Sequelize.DataTypes
  ),
  ADM_Process: require("./ADM_Process")(sequelize, Sequelize.DataTypes),
  ADM_TaskList: require("./ADM_TaskList")(sequelize, Sequelize.DataTypes),

  ADM_TaskUser_Mapping: require("./ADM_TaskUser_Mapping")(
    sequelize,
    Sequelize.DataTypes
  ),

  //omman models
  MDM_Employee: require("./MDM_Employee")(sequelize, Sequelize.DataTypes),
  MDM_DesignationJobRole: require("./MDM_DesignationJobRole")(
    sequelize,
    Sequelize.DataTypes
  ),
  MDM_Employee: require("./MDM_Employee")(sequelize, Sequelize.DataTypes),
  MDM_DesignationJobRole: require("./MDM_DesignationJobRole")(
    sequelize,
    Sequelize.DataTypes
  ),
  MDM_OfficeActType: require("./MDM_OfficeActType")(
    sequelize,
    Sequelize.DataTypes
  ),
  MDM_Circular: require("./MDM_Circular")(sequelize, Sequelize.DataTypes),
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
