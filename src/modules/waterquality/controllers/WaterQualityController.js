const WaterQuality = require('../models/WaterQuality');

const waterQualityController = {
  
  saveWaterqualityData: async (req, res) => {
    try {
      // Destructure data from the request body
      const {
        collectorName,
        designation,
        prepareDate,
        references,
        region,
        rsc,
        sampleDate,
        sampleGroup,
        sampleNumber,
        samplePointName,
        source,
        time,
        volume,
        weatherCondition
      } = req.body;

      // Create a new entry in the database with the received data
      const waterQualityData = await WaterQuality.create({
        collectorName,
        designation,
        prepareDate,
        references,
        region,
        rsc,
        sampleDate,
        sampleGroup,
        sampleNumber,
        samplePointName,
        source,
        time,
        volume,
        weatherCondition
      });

      res.status(201).json({
        success: true,
        data: waterQualityData
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },
  
 

  // Get all water quality records
  getAll: async (req, res) => {
    try {
      const waterQualityData = await WaterQuality.findAll();
      res.status(200).json({
        success: true,
        data: waterQualityData
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  // Get single water quality record
  getOne: async (req, res) => {
    try {
      const waterQualityData = await WaterQuality.findByPk(req.params.id);
      if (!waterQualityData) {
        return res.status(404).json({
          success: false,
          error: 'Record not found'
        });
      }
      res.status(200).json({
        success: true,
        data: waterQualityData
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  // Update water quality record
  update: async (req, res) => {
    try {
      const waterQualityData = await WaterQuality.findByPk(req.params.id);
      if (!waterQualityData) {
        return res.status(404).json({
          success: false,
          error: 'Record not found'
        });
      }
      await waterQualityData.update(req.body);
      res.status(200).json({
        success: true,
        data: waterQualityData
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  // Delete water quality record
  delete: async (req, res) => {
    try {
      const waterQualityData = await WaterQuality.findByPk(req.params.id);
      if (!waterQualityData) {
        return res.status(404).json({
          success: false,
          error: 'Record not found'
        });
      }
      await waterQualityData.destroy();
      res.status(200).json({
        success: true,
        message: 'Record deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  // Update all water quality records
  updateAll: async (req, res) => {
    console.log('Received data for update:', req.body); 
    try {
      const response = await WaterQuality.update(req.body, {
        where: {},
      });
      res.status(200).json({
        success: response[0] > 0, // Check if any records were updated
        message: response[0] > 0 ? 'Records updated successfully' : 'No records updated'
      });
    } catch (error) {
      console.error('Update error:', error); // Log the error
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }



























};

module.exports = waterQualityController;