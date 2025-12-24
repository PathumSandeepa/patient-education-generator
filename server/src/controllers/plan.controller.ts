import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMMA_API_KEY!);

export const generatePlaneController = async (req: Request, res: Response) => {
   const { condition, topic, educationLevel } = req.body;

   if (!condition || !topic || !educationLevel) {
      return res.status(400).json({ message: "Missing required fields" });
   }

   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

   try {
      console.log("Generating mocked plan for:", { condition, topic });

const prompt = `
          You are an experienced and empathetic nurse educator. Your goal is to create a clear, actionable patient education guide.

          ### Input Details
          - **Patient Condition:** "${condition}"
          - **Focus Topic:** "${topic}"
          - **Target Audience Level:** "${educationLevel}"

          ### Instructions
          1. **Tone & Language:**
             - strictly adapt the vocabulary to the "${educationLevel}". 
             - If the level is "Simple English", use 6th-grade reading level, short sentences, and avoid jargon.
             - If the level is "Medical Detail", use precise clinical terminology but explain it clearly.
             - Be encouraging and supportive.

          2. **Required Structure:**
             Please organize the response using the following Markdown headers:
             - **# ${topic} Guide** (Title)
             - **## What is this?** (Brief, simple explanation)
             - **## Why it Matters** (Benefits of following this advice)
             - **## Your Action Plan** (Step-by-step instructions or bullet points)
             - **## When to Call the Doctor** (Specific warning signs)

          3. **Formatting Rules:**
             - Use **Markdown** (bold key phrases, use bullet points for lists).
             - Do NOT include any conversational filler (e.g., "Here is your plan") or AI disclaimers. 
             - Start directly with the Title.
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
