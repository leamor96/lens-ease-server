import { Request, Response } from "express";
import { Router } from "express";
import { calculateProOptions } from "../middleware/proLensAlgorithm.js";


const router = Router();

// POST request handler
router.post("/", async (req: Request, res: Response) => {
  try {
    const proFormData = req.body;
    const proLensOptions = await calculateProOptions(proFormData);

    res.status(200).json({
      proFormData,
      proLensOptions: {
        rightEyeOptions: proLensOptions.rightEyeOptions,
        leftEyeOptions: proLensOptions.leftEyeOptions,
      },
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export { router as submitProFormRouter };
