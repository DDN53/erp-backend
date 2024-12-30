const express = require('express');
const router = express.Router();
const GWM_DrillingBitData = require('../models/GWM_DrillingBitData');

// Create a new drilling bit data record
router.post('/drillbit', async (req, res) => {
  try {
    const drillingBitData = await GWM_DrillingBitData.create(req.body);
    res.status(201).json(drillingBitData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all drilling bit data records
router.get('/bits', async (req, res) => {
  try {
    const drillingBits = await GWM_DrillingBitData.findAll();
    res.status(200).json(drillingBits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific drilling bit data record by ID
router.get('/:id', async (req, res) => {
  try {
    const drillingBit = await GWM_DrillingBitData.findByPk(req.params.id);
    if (drillingBit) {
      res.status(200).json(drillingBit);
    } else {
      res.status(404).json({ error: 'Drilling Bit Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a drilling bit data record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await GWM_DrillingBitData.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDrillingBit = await GWM_DrillingBitData.findByPk(req.params.id);
      res.status(200).json(updatedDrillingBit);
    } else {
      res.status(404).json({ error: 'Drilling Bit Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a drilling bit data record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GWM_DrillingBitData.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Drilling Bit Data successfully deleted' });
    } else {
      res.status(404).json({ error: 'Drilling Bit Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 