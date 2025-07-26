import { Request, Response } from "express";

export const generatePlaneController = async (req: Request, res: Response) => {
   const { condition, topic, educationLevel } = req.body;

   if (!condition || !topic || !educationLevel) {
      return res.status(400).json({ message: "Missing required fields" });
   }

   try {
      console.log("Generating mocked plan for:", { condition, topic });

      const mockPlan = `
         Patient Education Plan
         ----------------------

         Condition: ${condition}
         Topic: ${topic}
         Audience: ${educationLevel} Level

         This is a generated educational plan designed to be clear and informative. It is essential to discuss all medical information with a qualified healthcare provider. This plan is for educational purposes only.
      `;

      setTimeout(() => {
         res.status(200).json({ plan: mockPlan });
      }, 2000);
   } catch (error) {
      console.error("Error generating plan:", error);
      res.status(500).json({ message: "Failed to generate plan" });
   }
};
