import express from 'express';
import Mantra from "../models/Mantras.model.js";

const router = express.Router();

/* ---------------------------
   PUBLIC ROUTES
---------------------------- */

// GET all mantras with category + search
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search
    if (search && search.trim() !== "") {
      query.$or = [
        { sanskrit: { $regex: search, $options: "i" } },
        { hindi_meaning: { $regex: search, $options: "i" } },
        { english_meaning: { $regex: search, $options: "i" } }
      ];
    }

    const mantras = await Mantra.find(query).sort({ createdAt: -1 });

    return res.json({ success: true, mantras });

  } catch (error) {
    console.error("Error fetching mantras:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

// GET single mantra by ID
router.get('/:id', async (req, res) => {
  try {
    const mantra = await Mantra.findById(req.params.id);
    if (!mantra) {
      return res.status(404).json({ success: false, error: "Mantra not found" });
    }
    res.json({ success: true, mantra });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});


/* ---------------------------
   ADMIN ROUTES (ADD, UPDATE, DELETE)
---------------------------- */

// TODO: Add admin auth middleware
// Example: router.post('/', adminAuth, async (req, res) => { ... })

// Create new mantra (ADMIN)
router.post('/', async (req, res) => {
  try {
    const { sanskrit, hindi_meaning, english_meaning, category } = req.body;

    if (!sanskrit || !category) {
      return res.status(400).json({
        success: false,
        error: "sanskrit and category are required"
      });
    }

    const newMantra = new Mantra({
      sanskrit,
      hindi_meaning,
      english_meaning,
      category
    });

    const saved = await newMantra.save();

    return res.json({ success: true, mantra: saved });

  } catch (error) {
    console.error("Error creating mantra:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Update mantra (ADMIN)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Mantra.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: "Mantra not found"
      });
    }

    res.json({ success: true, mantra: updated });

  } catch (error) {
    console.error("Error updating mantra:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Delete mantra (ADMIN)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Mantra.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Mantra not found"
      });
    }

    res.json({ success: true, message: "Mantra deleted" });

  } catch (error) {
    console.error("Error deleting mantra:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

export default router;
