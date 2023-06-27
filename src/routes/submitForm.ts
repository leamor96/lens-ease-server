import { Request, Response } from "express";
import { Router } from "express";
import { calculateLensOptions } from "../middleware/lensAlgorithm.js";

const router = Router();

// POST request handler
router.post("/", async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const lensOptions = await calculateLensOptions(formData);
    
    res.status(200).json({
      formData,
      lensOptions: {
        rightEyeOptions: lensOptions.rightEyeOptions,
        leftEyeOptions: lensOptions.leftEyeOptions,
      },
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export { router as submitFormRouter };
