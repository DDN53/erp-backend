const Sequelize = require("sequelize");
// const sequelize = require("../../config/database");
const sequelize = require("../../../../config/database");

const models = {
  //admin related
  ADM_ServerUser: require("./ADM_ServerUser")(sequelize, Sequelize.DataTypes),
  ADM_Module: require("./ADM_Module")(sequelize, Sequelize.DataTypes),
  ADM_ProcessGroups: require("./ADM_ProcessGroups")(sequelize,Sequelize.DataTypes),
  ADM_Process: require("./ADM_Process")(sequelize, Sequelize.DataTypes),
  ADM_TaskList: require("./ADM_TaskList")(sequelize, Sequelize.DataTypes),

  ADM_TaskUser_Mapping: require("./ADM_TaskUser_Mapping")(sequelize,Sequelize.DataTypes),

  //comman models
  MDM_Employee: require("./MDM_Employee")(sequelize, Sequelize.DataTypes),
  MDM_BoardGrade: require("./MDM_BoardGrade")(sequelize, Sequelize.DataTypes),
  MDM_DesignationJobRole: require("./MDM_DesignationJobRole")(sequelize,Sequelize.DataTypes
  ),
  MDM_Designation: require("./MDM_Designation")(sequelize, Sequelize.DataTypes),
  // MDM_DesignationCategory: require("./MDM_DesignationCategory")(sequelize, Sequelize.DataTypes),
  // MDM_DesignationSummaryCategory: require("./MDM_DesignationSummaryCategory")(sequelize, Sequelize.DataTypes),
  MDM_DesignationJobRole: require("./MDM_DesignationJobRole")(sequelize,Sequelize.DataTypes),
  MDM_OfficeActType: require("./MDM_OfficeActType")(sequelize,Sequelize.DataTypes),
  MDM_Circular: require("./MDM_Circular")(sequelize, Sequelize.DataTypes),
  MDM_SHR_WorkLocation: require("./MDM_SHR_WorkLocation")(sequelize, Sequelize.DataTypes),
  MDM_SHR_WorkLocationType: require("./MDM_SHR_WorkLocationType")(sequelize, Sequelize.DataTypes),
  MDM_SHR_CostCentre: require("./MDM_SHR_CostCentre")(sequelize, Sequelize.DataTypes),
  MDM_SHR_WorkLocation_CostCentre_Mapping: require("./MDM_SHR_WorkLocation_CostCentre_Mapping")(sequelize, Sequelize.DataTypes),
};

// Initialize associations  , MDM_SHR_WorkLocation_CostCentre_Mapping
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
