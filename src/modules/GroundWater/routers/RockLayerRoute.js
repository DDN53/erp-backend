const express = require('express');
const router = express.Router();
const GWM_RockLayer = require('../models/GWM_RockLayer');

// Create a new rock layer record
router.post('/addrock', async (req, res) => {
  try {
    const rockLayerData = await GWM_RockLayer.create(req.body);
    res.status(201).json(rockLayerData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all rock layer records
router.get('/viewrocks', async (req, res) => {
  try {
    const rockLayers = await GWM_RockLayer.findAll();
    res.status(200).json(rockLayers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific rock layer record by ID
router.get('/:id', async (req, res) => {
  try {
    const rockLayer = await GWM_RockLayer.findByPk(req.params.id);
    if (rockLayer) {
      res.status(200).json(rockLayer);
    } else {
      res.status(404).json({ error: 'Rock Layer Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a rock layer record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await GWM_RockLayer.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRockLayer = await GWM_RockLayer.findByPk(req.params.id);
      res.status(200).json(updatedRockLayer);
    } else {
      res.status(404).json({ error: 'Rock Layer Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a rock layer record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GWM_RockLayer.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({message:'Delete rocklayerData Susscessfully'});
    } else {
      res.status(404).json({ error: 'Rock Layer Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 