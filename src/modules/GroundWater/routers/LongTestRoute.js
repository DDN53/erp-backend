const express = require('express');
const router = express.Router();
const GWM_LongTest = require('../models/GWM_LongTest');

// Create a new long test record
router.post('/testlong', async (req, res) => {
  try {
    const longTestData = await GWM_LongTest.create(req.body);
    res.status(201).json(longTestData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all long test records
router.get('/tests', async (req, res) => {
  try {
    const longTests = await GWM_LongTest.findAll();
    res.status(200).json(longTests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific long test record by ID
router.get('/:id', async (req, res) => {
  try {
    const longTest = await GWM_LongTest.findByPk(req.params.id);
    if (longTest) {
      res.status(200).json(longTest);
    } else {
      res.status(404).json({ error: 'Long Test Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a long test record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await GWM_LongTest.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLongTest = await GWM_LongTest.findByPk(req.params.id);
      res.status(200).json(updatedLongTest);
    } else {
      res.status(404).json({ error: 'Long Test Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a long test record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GWM_LongTest.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Long Test Data successfully deleted' });
    } else {
      res.status(404).json({ error: 'Long Test Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 