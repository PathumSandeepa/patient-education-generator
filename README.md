# Personalized Patient Education Plan Generator

A full-stack web application for generating personalized patient education plans using **Google's Gemini AI**.

---

## 📜 Overview

This application combines a modern, responsive UI with a robust backend to deliver AI-powered, customized educational plans for patients. It supports secure user authentication via **Google OAuth 2.0** and leverages **Gemini AI** for intelligent content generation.

🔗 **Live Demo:** `[Your Deployed App URL Here]`  
📂 **GitHub Repository:** `https://github.com/PathumSandeepa/patient-education-generator`

---

## ✨ Features

-   **🔐 Secure User Authentication:** Safe and seamless login with Google OAuth 2.0.
-   **🤖 AI-Powered Plan Generation:** Tailored content generation with Google's Gemini AI.
-   **🎨 Modern Frontend:** Built with Next.js, Tailwind CSS, and Framer Motion.
-   **🌀 Dynamic 3D Landing Page:** Engaging visuals using Three.js animations.
-   **⚙️ Robust Backend:** Scalable Node.js + Express API with TypeScript.
-   **🛡 Protected Routes:** Middleware-secured sensitive features.
-   **📦 Type-Safe Codebase:** TypeScript for reliability and maintainability.

---

## 🛠️ Tech Stack

### Frontend
- Next.js (v15)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Redux Toolkit
- Three.js / @react-three/fiber

### Backend
- Node.js
- Express.js
- Prisma
- Passport.js (Google OAuth)
- JSON Web Tokens (JWT)

### Database
- MongoDB Atlas

### AI
- Google Gemini AI

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v20+)
* Git
* MongoDB Atlas account
* Google Cloud Platform account
* Google AI Studio account

### Backend Setup

1.  **Clone the repository and navigate to the server directory:**
    ```bash
    git clone [https://github.com/PathumSandeepa/patient-education-generator.git](https://github.com/PathumSandeepa/patient-education-generator.git)
    cd patient-education-generator/server
    ```

2.  **Create the environment file:**
    ```bash
    touch .env
    ```

3.  **Add your credentials to the `server/.env` file:**
    ```env
    PORT=3001
    DATABASE_URL="YOUR_MONGODB_CONNECTION_STRING"
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
    JWT_SECRET="YOUR_SECURE_RANDOM_STRING"
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```
    -   **`DATABASE_URL`**: Get this from your MongoDB Atlas cluster.
    -   **`GOOGLE_...`**: Get these from your Google Cloud Platform OAuth 2.0 setup.
    -   **`JWT_SECRET`**: Generate a strong, random secret key.
    -   **`GEMINI_API_KEY`**: Get this from Google AI Studio.

4.  **Install dependencies and run the server:**
    ```bash
    npm install
    npx prisma generate
    npm run dev
    ```
    The backend will be running at `http://localhost:3001`.

### Frontend Setup

1.  **Navigate to the client directory and create the environment file:**
    ```bash
    cd ../client
    touch .env.local
    ```

2.  **Add the backend API URL to `.env.local`:**
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

3.  **Install dependencies and run the frontend:**
    ```bash
    npm install
    npm run dev
    ```
    The frontend will be running at `http://localhost:3000`.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

*(**Note:** You would need to add a file named `LICENSE` to your repository containing the text of the MIT License for this to be complete.)*

---

## 📞 Contact

**Pathum Sandeepa** – [GitHub Profile](https://github.com/PathumSandeepa)

Project Link: [https://github.com/PathumSandeepa/patient-education-generator](https://github.com/PathumSandeepa/patient-education-generator)

<p align="center">&copy; 2025 Personalized Patient Education Plan Generator</p>
