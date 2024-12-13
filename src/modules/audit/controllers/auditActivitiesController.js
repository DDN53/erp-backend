const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const { MDM_AUD_AuditActivities } = require("../models");

const getAllActivities = async (req, res) => {
  try {
    const activities = await MDM_AUD_AuditActivities.findAll();

    // Modify the keys to have the first letter in lowercase
    const modifiedActivities = activities.map((activity) => {
      const activityData = activity.toJSON();
      const modifiedActivity = {};

      Object.keys(activityData).forEach((key) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        modifiedActivity[newKey] = activityData[key];
      });

      return modifiedActivity;
    });

    res.status(200).json(modifiedActivities);
    console.log(modifiedActivities);
  } catch (error) {
    console.error("Error fetching audit activities data:", error);
    res.status(500).json({ error: "Failed to fetch audit activities data" });
  }
};

module.exports = { getAllActivities };
