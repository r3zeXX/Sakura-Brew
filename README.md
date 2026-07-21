# Sakura Brew Cafe

A premium Japanese Cafe website featuring an integrated AI Barista built with React, Vite, Tailwind CSS, and Framer Motion. 

This project operates entirely as a static site and allows customers to use their own AI provider API keys (Bring Your Own Key architecture).

## Features

- **AI Barista Chatbot**: Real-time streaming chat powered by multiple AI providers (OpenRouter, Google Gemini, Groq).
- **BYOK Architecture**: Secure local storage of user API keys. Keys are never sent to a backend server.
- **Modern Design**: Premium Japanese minimalist aesthetic using Tailwind CSS and Framer Motion.
- **Static Hosting**: Configured to deploy seamlessly to GitHub Pages or Vercel.

## Security & Privacy

- API keys are stored only in browser `localStorage`.
- No analytics or tracking.
- Strict Content Security measures via static deployment.

## Getting Free API Keys

You can get free API keys to power the AI Barista here:
- [OpenRouter Keys](https://openrouter.ai/keys) (Access free models like Llama 3)
- [Google Gemini Keys](https://aistudio.google.com/app/apikey) (Free tier available)
- [Groq Keys](https://console.groq.com/keys) (Fast, free inference)

## Local Development

If you have Node.js and npm installed:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Deployment

### GitHub Pages

This project is configured for GitHub Pages via GitHub Actions.
1. Push the code to the `main` branch.
2. The `.github/workflows/deploy.yml` action will automatically build and deploy to GitHub Pages.

### Vercel

This project includes a `vercel.json` file for proper SPA routing.
1. Import the repository in Vercel.
2. Vercel will automatically detect the Vite React configuration and build the app.
