import { ProLens } from "../db/models/proLens.js";

export const calculateProOptions = async (proFormData) => {
  const sphRight = parseFloat(proFormData.sphRight);
  const sphLeft = parseFloat(proFormData.sphLeft);

  try {
    const queryRight = {
      "sphRange.minus": { $lte: sphRight },
      "sphRange.plus": { $gte: sphRight },
    };

    const queryLeft = {
      "sphRange.minus": { $lte: sphLeft },
      "sphRange.plus": { $gte: sphLeft },
    };

    const rightEyeLenses = await ProLens.find(queryRight).sort({ price: 1 });
    const leftEyeLenses = await ProLens.find(queryLeft).sort({ price: 1 });

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
