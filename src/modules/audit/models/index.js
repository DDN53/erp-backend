const Sequelize = require("sequelize");
// const sequelize = require("../../config/database");
const sequelize = require("../../../../config/database");

const models = {
  MDM_AUD_AuditActivities: require("./MDM_AUD_AuditActivities")(
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
