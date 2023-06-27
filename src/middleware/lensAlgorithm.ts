import { Lens } from "../db/models/lens.js";

export const calculateLensOptions = async (formData) => {
  const sphRight = parseFloat(formData.sphRight);
  const cylRight = parseFloat(formData.cylRight);
  const sphLeft = parseFloat(formData.sphLeft);
  const cylLeft = parseFloat(formData.cylLeft);

  try {
    const queryRight = {
      "sphRange.minus": { $lte: sphRight },
      "sphRange.plus": { $gte: sphRight },
      $or: [{ cylMax: { $lte: cylRight } }, { cylMax: null }],
    };

    const queryLeft = {
      "sphRange.minus": { $lte: sphLeft },
      "sphRange.plus": { $gte: sphLeft },
      $or: [{ cylMax: { $lte: cylLeft } }, { cylMax: null }],
    };

    const rightEyeLenses = await Lens.find(queryRight).sort({ price: 1 });
    const leftEyeLenses = await Lens.find(queryLeft).sort({ price: 1 });
 
    if (rightEyeLenses.length === 0 && leftEyeLenses.length === 0) {
      return {
        rightEyeOptions: [],
        leftEyeOptions: [],
      };
    }

    return {
      rightEyeOptions: rightEyeLenses,
      leftEyeOptions: leftEyeLenses,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch lens options");
  }
};
