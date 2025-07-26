import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMMA_API_KEY!);

export const generatePlaneController = async (req: Request, res: Response) => {
   const { condition, topic, educationLevel } = req.body;

   if (!condition || !topic || !educationLevel) {
      return res.status(400).json({ message: "Missing required fields" });
   }

   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

   try {
      console.log("Generating mocked plan for:", { condition, topic });

      const prompt = `
         You are a helpful medical assistant tasked with creating clear and concise educational material for a patient. 
         Your tone should be empathetic, professional, and easy to understand.

         Please generate a patient education plan based on the following details:
         - Patient's Condition: "${condition}"
         - Specific Topic of Education: "${topic}"
         - Desired Audience Level: "${educationLevel}"

         Structure the response with clear headings. Do not include any disclaimers like "I am an AI model" or "This is not medical advice." 
         Focus solely on providing the educational content as requested.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      res.status(200).json({ plan: text });
   } catch (error) {
      console.error('Error calling Google AI API:', error);
      res.status(500).json({ message: 'Failed to generate plan due to an internal error.' });
   }
};
