# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages.

## Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the React app with Vite when code is pushed to `main` or `github-pages-setup`
2. Uploads the compiled static files to GitHub Pages
3. Publishes the site at: `https://jwenge.github.io/mdstech/`

## Manual Deployment (Local)

If you need to deploy locally:

```bash
# Install dependencies
npm install

# Build the static site
npm run build

# Verify the build
npm run preview

# Deploy (requires git setup)
npm run deploy
```

## Configuration

The deployment is configured with:

- **Base path**: `/mdstech/` (set in `vite.config.ts`)
- **Build output**: `dist/` directory
- **Workflow file**: `.github/workflows/deploy.yml`

## Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - Select **Source**: GitHub Actions
   - The workflow will automatically deploy on push

## Important Notes

- The app is a **static SPA** (Single Page Application)
- The `/api/diagnose` endpoint requires a backend server (not available on static GitHub Pages)
- Without the backend, the AI Incident Triage feature will show fallback diagnostics
- To use the full app with AI features, deploy the full Express server elsewhere (e.g., Vercel, Railway, Heroku)

## See It Live

Visit: https://jwenge.github.io/mdstech/
