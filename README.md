# Koen Felder - Full Stack Web Developer Portfolio

Welcome to my professional portfolio. This project showcases a blend of logic-driven web development and creative editorial design.

## Featured Projects

- **Nexus CRM**: A streamlined client management system for modern creative agencies, featuring a strategic dashboard and analytics.
- **README Generator**: A specialized tool for developers to generate and preview polished GitHub profile READMEs.
- **SkinWalker Society Magazine**: An interactive digital viewer for a 24-page subculture magazine exploring cryptozoology and Navajo folklore.
- **TechNova**: A high-end retail electronics e-commerce experience focused on luxury and performance.

## Local Setup Instructions

Follow these steps to get the project running on your computer:

1. **Download the Project**: Download the project as a ZIP from AI Studio (Settings > Export) or clone it if you've exported it to GitHub.
2. **Open in VS Code**: Open the project folder in VS Code.
3. **Install Dependencies**: Open your terminal in VS Code and run:
   ```bash
   npm install
   ```
   *This will download all the libraries (React, Tailwind, Recharts, etc.) and fix the "red lines" error.*
4. **Run the Project**: Start the development server by running:
   ```bash
   npm run dev
   ```
5. **View the App**: Click the link in the terminal (usually `http://localhost:5173`) to see your app.

## Publishing to GitHub Desktop

1. **Open GitHub Desktop**: Click "File" > "Add Local Repository".
2. **Select Folder**: Choose this project folder.
3. **Initialize (if needed)**: If it's not a repository yet, GitHub Desktop will offer to create one.
4. **Commit & Publish**: Write a summary (e.g., "Initial commit"), click "Commit to main", and then "Publish repository".

## Troubleshooting

- **Red Lines in VS Code**: Make sure you have run `npm install`. If they persist, try restarting VS Code or the TypeScript server (`Ctrl+Shift+P` > "Restart TS Server").
- **Styles Not Loading**: This project uses **Tailwind CSS v4**. Ensure your `src/index.css` has `@import "tailwindcss";` at the top.
