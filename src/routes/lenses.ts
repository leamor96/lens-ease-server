import { Router } from "express";
import { Lens } from "../db/models/lens.js";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { User } from "../db/models/user.js";

const router = Router();
// Get all the lenses from the database
router.get("/", async (req, res) => {
  try {
    const lenses = await Lens.find({});
    res.status(200).json(lenses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Get a single lens by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const lens = await Lens.findById(id);
    if (!lens) {
      return res.status(404).send("Lens not found");
    }
    res.status(200).json(lens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Protected routes
// Create a new lens
router.post("/", validateToken, isAdmin, async (req, res) => {
  try {
    const newLens = new Lens(req.body);
    const existingLens = await Lens.findOne({
      name: newLens.name,
      category: newLens.category,
      index: newLens.index,
      diameter: newLens.diameter,
      "sphRange.minus": newLens.sphRange.minus,
      "sphRange.plus": newLens.sphRange.plus,
      cylMax: newLens.cylMax,
      coating: newLens.coating,
      price: newLens.price,
    });
    if (existingLens) {
      res.status(400).json({ message: "Lens already exists" });
    } else {
      await newLens.save();
      res.status(201).json(newLens);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Update a lens by ID
router.put("/:id", validateToken, isAdmin, async (req, res) => {
  try {
    const lensId = req.params.id;
    const updatedLens = await Lens.findByIdAndUpdate(lensId, req.body, {
      new: true,
    });
    res.json(updatedLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a lens by ID
router.delete("/:id", validateToken, isAdmin, async (req, res) => {
  try {
    const lensId = req.params.id;
    const deletedLens = await Lens.findByIdAndDelete(lensId);
    if (!deletedLens) {
      return res.status(404).send("Lens not found");
    }
    res.status(200).json({ message: "Lens deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Toggle favorite status of a lens for the authenticated user
router.post("/:userId/favorite/:lensId", validateToken, async (req, res) => {
  try {
    const userId = req.params.userId; 
    const lensId = req.params.lensId;
    const user = await User.findById(userId);
    const lens = await Lens.findById(lensId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const lensExists = user.favoritesLens.find(
      (e) => e._id.toString() === lensId
    );
    if (lensExists) {
      return res.status(422).send("This Exists!");
    }
    user.favoritesLens.push(lens);
    await user.save();
    res.status(200).send("Favorite status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Get all favorite lenses for the authenticated user
router.get("/:id/favorites", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user.favoritesLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
//remove favorit lens for the authenticated user
router.delete(
  "/:userId/delete-from-favorite/:lensId",
  validateToken,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const lensId = req.params.lensId;
      const user = await User.findById(userId);
      console.log(user)
      if (!user) {
        return res.status(404).send("User not found");
      }
      const lens = await Lens.findById(lensId);
      console.log(lens)
      if (!lens) {
        return res.status(404).send("Lens not found");
      }
      const lensExists = user.favoritesLens.find(
        (e) => e._id.toString() === lensId
      );
      if (lensExists) {
        user.favoritesLens.pull(lensExists);
      }
      await user.save();
      return res.status(200).send("Lens removed from favorites successfully");
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
);

export { router as lensesRouter };
