# MERN ChatBot with Gemini API

This project is a chat bot application built with the MERN stack (MongoDB, Express, React, Node.js) and integrates the Gemini API for AI-powered responses.

## Structure
- `client/` - React frontend
- `server/` - Node.js/Express backend

## Setup

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation

1. Install dependencies for both client and server:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
2. Set up your Gemini API key in the server (see `.env.example`).
3. Start MongoDB.
4. Run the development servers:
   ```sh
   cd server && npm run dev
   cd ../client && npm start
   ```

## Features
- Real-time chat interface
- AI-powered responses using Gemini API

---
Replace placeholders and configure environment variables as needed.
