const express = require('express');
const router = express.Router();
const GWM_DrillingCaseData = require('../models/GWM_DrillingCaseData');

// Create a new drilling case data record
router.post('/create', async (req, res) => {
  try {
    const drillingCaseData = await GWM_DrillingCaseData.create(req.body);
    res.status(201).json(drillingCaseData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all drilling case data records
router.get('/', async (req, res) => {
  try {
    const drillingCases = await GWM_DrillingCaseData.findAll();
    res.status(200).json(drillingCases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific drilling case data record by ID
router.get('/:id', async (req, res) => {
  try {
    const drillingCase = await GWM_DrillingCaseData.findByPk(req.params.id);
    if (drillingCase) {
      res.status(200).json(drillingCase);
    } else {
      res.status(404).json({ error: 'Drilling Case Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a drilling case data record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await GWM_DrillingCaseData.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDrillingCase = await GWM_DrillingCaseData.findByPk(req.params.id);
      res.status(200).json(updatedDrillingCase);
    } else {
      res.status(404).json({ error: 'Drilling Case Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a drilling case data record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GWM_DrillingCaseData.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Drilling Case Data successfully deleted' });
    } else {
      res.status(404).json({ error: 'Drilling Case Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 