const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const GWM_WaterQuality = sequelize.define('GWM_WaterQuality', {
    collectorName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prepareDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    references: {
      type: DataTypes.STRING,
      allowNull: true
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rsc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sampleDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sampleGroup: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sampleNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    samplePointName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    volume: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    weatherCondition: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true 
  });
  
  module.exports = GWM_WaterQuality; 