const express = require('express');
const router = express.Router();
const GWM_Ream = require('../models/GWM_Ream');

// Create a new ream record
router.post('/ream', async (req, res) => {
  try {
    const reamData = await GWM_Ream.create(req.body);
    res.status(201).json(reamData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all ream records
router.get('/viewreams', async (req, res) => {
  try {
    const reams = await GWM_Ream.findAll();
    res.status(200).json(reams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific ream record by ID
router.get('/:id', async (req, res) => {
  try {
    const ream = await GWM_Ream.findByPk(req.params.id);
    if (ream) {
      res.status(200).json(ream);
    } else {
      res.status(404).json({ error: 'Ream Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a ream record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await GWM_Ream.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedReam = await GWM_Ream.findByPk(req.params.id);
      res.status(200).json(updatedReam);
    } else {
      res.status(404).json({ error: 'Ream Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a ream record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GWM_Ream.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Ream Data successfully deleted' });
    } else {
      res.status(404).json({ error: 'Ream Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 