# Deploying to Vercel

This hub is designed to run as a Next.js webpage on Vercel.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- [Vercel CLI](https://vercel.com/docs/cli) installed (or Vercel account)
- This repository cloned locally

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Option 2: Using GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select this GitHub repository
4. Configure environment variables (none required for now)
5. Click "Deploy"

Vercel will auto-deploy on every push to `main`.

## Domain Configuration

Once deployed, you can assign a custom domain:

1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add domain (e.g., `bettercallzaal-hub.com` or `zao-hub.com`)
4. Follow DNS instructions

## Environment Variables

None required currently, but you can add these for future features:

```
NEXT_PUBLIC_GITHUB_TOKEN=<your-github-token>
NEXT_PUBLIC_DOMAIN=<your-domain>
```

## Features

- ✅ Project listing from `projects.json`
- ✅ Filter by language, status
- ✅ Search by project name/description
- [ ] OG image generation (future)
- [ ] Per-project share buttons (future)
- [ ] Farcaster frame integration (future)

## Structure

```
.
├── app/                 # Next.js app directory
│   ├── page.tsx        # Homepage
│   ├── projects/       # Project pages
│   └── api/            # API routes
├── components/          # Reusable React components
├── projects.json        # Project index (deployed at build time)
├── public/              # Static assets
└── package.json
```

## Building for Production

```bash
# Build
npm run build

# Test production build locally
npm start
```

## Troubleshooting

**Issue**: Deployment fails with `ModuleNotFoundError`
- Solution: Run `npm install` and try again

**Issue**: Projects not loading
- Solution: Ensure `projects.json` exists at the root
- Check that it's valid JSON: `npm run lint:json`

**Issue**: Slow builds
- Solution: Optimize images, reduce bundle size
- Enable incremental static regeneration (ISR)

## Updates

To update the project index after adding new projects:

1. Push changes to GitHub
2. Vercel will auto-rebuild
3. Updated project list appears on deployment

## Next Steps

See [README.md](./README.md) for future enhancements and feature roadmap.
