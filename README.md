# PLAYZO
React + TypeScript + Vite + Tailwind. English/Arabic (RTL), local-only data.

## Run
    npm install
    npm run dev      # http://localhost:5173
    npm test         # game logic + streak tests
    npm run build    # typecheck + production build in dist/

## Before launch
- Change EMAIL (and BRAND) in src/components/Layout.tsx
- Replace YOUR-DOMAIN.com in public/sitemap.xml and public/robots.txt
- Review Privacy/Terms text (src/i18n/en.ts, ar.ts): they are templates
- Ads: slots are labeled placeholders (src/components/Ui.tsx). No ad script or publisher ID is included. Add AdSense only after approval, with a proper consent flow.

## Deploy (Vercel)
1. Push this folder to a GitHub repo
2. vercel.com > Add New > Project > import the repo
3. Framework: Vite (auto-detected). Build: npm run build. Output: dist
4. Deploy. vercel.json already handles route rewrites

## Deploy (Netlify)
1. app.netlify.com > Add new site > Import from Git
2. Build command: npm run build. Publish directory: dist
3. public/_redirects already handles route rewrites

## Add a game
1. Create src/games/MyGame.tsx (default export, props: { onFinish(score) })
2. Add g.<id>.name / desc / how to src/i18n/en.ts and ar.ts
3. Add one line to src/games/registry.ts (set lowerBetter if a lower score wins)
