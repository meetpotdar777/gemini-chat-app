GEMINI-CHAT-APP 💬

This is a simple and interactive chat application built with React, featuring a clean user interface styled with Tailwind CSS. It allows users to interact with the Google Gemini API to get AI-generated responses in real-time.

Features 🚀

User-Friendly Interface: A clean and modern chat interface built with React and styled using Tailwind CSS.

AI-Powered Responses: Integrates with the Google Gemini API to provide intelligent conversational responses.

Real-time Chat: Displays user messages and AI responses in a continuous chat history.

Loading Indicator: Shows a clear loading state when waiting for AI responses.

Automatic Scrolling: Automatically scrolls to the latest message in the chat.

Toast Notifications: Provides subtle feedback for user actions and API errors.

Responsive Design: Adapts to different screen sizes for a consistent experience on various devices.

Technologies Used 💻

React: Frontend library for building the user interface. ⚛️

JavaScript: Core language for application logic. 📜

HTML & CSS: For structuring and styling. 🎨

Tailwind CSS: A utility-first CSS framework for rapid UI development. 💨

Google Fonts (Inter): For a clean and legible typography. 🅰️

Lucide React: For simple, customizable icons. ✨

Google Gemini API: For generating AI responses. 🧠

Getting Started 🏁

Follow these steps to set up and run the chat application on your local machine.

Prerequisites ✅

Node.js (LTS version recommended) and npm (Node Package Manager) installed on your system. 🟢

VS Code (or any other code editor) 📝

Installation ⬇️

Create a React Project (if you haven't already):

Open your terminal or command prompt and run:

npx create-react-app gemini-chat-app
cd gemini-chat-app

(You can replace gemini-chat-app with your desired project name.)

Install Tailwind CSS:

If you haven't already, install Tailwind CSS and its peer dependencies, then initialize it:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

This will create tailwind.config.js and postcss.config.js.

Configure tailwind.config.js:

Open tailwind.config.js and ensure the content array includes paths to all your files that use Tailwind classes:

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", // Include this if you have Tailwind classes in index.html
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Add Inter font
      },
    },
  },
  plugins: [],
}

Add Tailwind Directives to src/index.css:

Open src/index.css and replace its content with the following to include Tailwind's base, components, and utilities, along with the Inter font import:

/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add Google Fonts for Inter */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* Custom Scrollbar Style (still needed) */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Spinner animation (still needed) */
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

Update public/index.html:

Ensure your public/index.html file is clean and does not contain any Bootstrap CDN links or custom <style> blocks. It should look like a standard create-react-app generated index.html file.

Copy the Application Code (src/App.js):

Replace the entire content of your src/App.js file with the React code that uses Tailwind CSS classes (the gemini-chat-react-app-tailwind artifact from our conversation).

Running the Application ▶️

Install Dependencies:

In your project directory, open your terminal and run:

npm install

This will install React and other necessary packages.

Start the Development Server:

Once dependencies are installed, run:

npm start

This command runs the app in development mode.

Open http://localhost:3000 (or another available port) in your web browser to view the application.

The page will automatically reload if you make edits. You will also see any lint errors in the console.

Important Notes ⚠️

Google Gemini API Key: The App.js code expects the Google Gemini API key to be provided at runtime by the Canvas environment. If you are running this outside of a Canvas environment, you would typically need to manage your API key securely (e.g., via environment variables) and pass it to the sendMessage function.

Styling: This application is primarily styled using Tailwind CSS utility classes. Ensure Tailwind is correctly set up as described in the installation steps for the styles to apply.
