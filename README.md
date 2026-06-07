# BluMoves — Easy & Done

Marketing site for BluMoves, a local moving company serving Northern NJ & Morris County.

**Stack:** Next.js 14 (App Router) — same as MoveWise AI, so it deploys to Vercel identically.

## Brand
- Cyan: `#3AD6FF` (pulled directly from your logo)
- Ink (black): `#07090D`
- Fonts: Archivo Black (display) + Archivo (body)
- Phone CTA everywhere: 973-216-0926

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy to Vercel (same as MoveWise)
1. Create a new GitHub repo (e.g. `blumoves`) and push this folder.
2. In Vercel: New Project → import the repo → framework auto-detects Next.js → Deploy.
3. Add your domain in Vercel → Domains, then point Namecheap DNS.

### Push to GitHub
```bash
git init
git add .
git commit -m "BluMoves site v1"
git branch -M main
git remote add origin https://github.com/<you>/blumoves.git
git push -u origin main
```

## Claude Code workflow (your usual loop)
Describe a change → I write the Claude Code prompt → paste into Claude Code → auto-deploys via Vercel.

## What's on the page
- Hero with phone CTA + pusher figure from your logo
- Scrolling marquee (50+ moves, insured, no hidden fees)
- Stats: 50+ moves, $50K+ delivered, 5★ standard
- Services: home/apartment, load/unload, furniture, office
- How it works (3 steps)
- Why us (4 reasons)
- Call/Text CTA + footer

## Easy edits
- Phone number: top of `app/page.js` (`PHONE` / `PHONE_TEL`)
- Stats: the `stats-grid` section in `app/page.js`
- Colors: `:root` variables in `app/globals.css`
- Logo assets: `public/` (logo.png, figures-clean.png)
