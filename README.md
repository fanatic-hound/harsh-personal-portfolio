# Harsh Pal — Portfolio

A modern, responsive developer portfolio built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and an **AI chatbot** powered by OpenRouter.

> Live at: _your-deployment-url-here_

---

## Features

- Responsive design (mobile-first, works on all screen sizes)
- Dark / Light theme toggle
- Smooth scroll navigation with a collapsible sidebar
- Animated intro with HTML5 Canvas
- About, Work Experience (timeline), Projects, and Contact sections
- Contact form powered by **EmailJS**
- AI chatbot that answers questions about Harsh using resume data + OpenRouter LLM
- Vercel Analytics integration

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3, CSS Modules |
| Animation | Framer Motion |
| AI Chat | OpenRouter API (free-tier models) |
| Contact | EmailJS |
| Deployment | Vercel (recommended) |

---

## Prerequisites

- **Node.js** >= 18
- **npm** (or yarn / pnpm)
- An [OpenRouter](https://openrouter.ai/) API key (free)
- An [EmailJS](https://www.emailjs.com/) account (free tier)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/fanatic-hound/harsh-portfolio.git
cd harsh-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your keys:

```bash
cp .env.local.example .env.local
```

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Dashboard → Email Services |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS Dashboard → Email Templates |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_API` | EmailJS Dashboard → Account → API Keys |
| `OPENROUTER_API_KEY` | https://openrouter.ai/keys |
| `OPENROUTER_MODEL` | Any model from https://openrouter.ai/models (default: `arcee-ai/trinity-large-preview:free`) |

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Updating the Resume

The AI chatbot reads a **pre-extracted text version** of the resume at `public/Harsh_Pal_CV.txt`.

When you update `public/Harsh_Pal_CV.pdf`, regenerate the text file:

```bash
node -e "const {PDFParse} = require('pdf-parse'); const fs = require('fs'); const buf = new Uint8Array(fs.readFileSync('./public/Harsh_Pal_CV.pdf')); const p = new PDFParse(buf); p.getText().then(r => { fs.writeFileSync('./public/Harsh_Pal_CV.txt', r.pages.map(pg => pg.text).join('\n'), 'utf-8'); console.log('Done'); })"
```

---

## Project Structure

```
harsh-portfolio/
├── public/
│   ├── Harsh_Pal_CV.pdf        # Resume PDF (downloadable)
│   ├── Harsh_Pal_CV.txt        # Extracted text (used by AI chatbot)
│   ├── Links.tsx                # Social links data
│   └── images/                  # Static images
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts   # AI chatbot API route (OpenRouter)
│   │   ├── globals.css          # Global styles & CSS variables
│   │   ├── layout.tsx           # Root layout
│   │   ├── metadata.ts          # SEO metadata
│   │   └── page.tsx             # Main page (all sections)
│   ├── components/
│   │   ├── About.tsx            # About section
│   │   ├── Card.tsx             # Project card
│   │   ├── ChatBot.tsx          # AI chatbot widget
│   │   ├── Contact.tsx          # Contact form (EmailJS)
│   │   ├── Headers.tsx          # Section headers
│   │   ├── Intro.tsx            # Hero / intro section
│   │   ├── Landing.tsx          # Initial landing animation
│   │   ├── LandingWithName.tsx  # Name reveal animation
│   │   ├── Logo.tsx             # Nav logo
│   │   ├── Navbar.tsx           # Sidebar navigation
│   │   ├── Projects.tsx         # Projects section
│   │   ├── ResumeButton.tsx     # Download resume button
│   │   ├── ThemeToggleButton.tsx# Dark/light toggle
│   │   ├── WorkExperience.tsx   # Timeline section
│   │   └── renderCanvas.jsx     # Canvas animation
│   └── context/
│       └── ThemeContext.tsx      # Theme provider
├── .env.local.example           # Environment variables template
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import the project on [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` in the Vercel dashboard under **Settings → Environment Variables**.
4. Deploy — Vercel auto-detects Next.js and handles the rest.

> **Important:** Make sure `public/Harsh_Pal_CV.txt` is committed to the repo so the AI chatbot works in production.

---

## License

MIT
