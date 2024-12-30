const express = require('express');
const router = express.Router();
const GWM_Chemical = require('../models/GWM_Chemical');

// Create a new chemical record
router.post('/addchemical', async (req, res) => {
  try {
    const chemicalData = await GWM_Chemical.create(req.body);
    res.status(201).json(chemicalData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all chemical records
router.get('/', async (req, res) => {
  try {
    const chemicals = await GWM_Chemical.findAll();
    res.status(200).json(chemicals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific chemical record by ID
router.get('/:id', async (req, res) => {
  try {
    const chemical = await GWM_Chemical.findByPk(req.params.id);
    if (chemical) {
      res.status(200).json(chemical);
    } else {
      res.status(404).json({ error: 'Chemical not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a chemical record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await GWM_Chemical.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedChemical = await GWM_Chemical.findByPk(req.params.id);
      res.status(200).json(updatedChemical);
    } else {
      res.status(404).json({ error: 'Chemical not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a chemical record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GWM_Chemical.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Chemical Data successfully deleted' });
    } else {
      res.status(404).json({ error: 'Chemical not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 