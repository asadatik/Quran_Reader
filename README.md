#  Al-Quran — Read & Reflect

A minimalist, high-performance Quran reading application built with **Next.js 14**. Designed for a peaceful and distraction-free experience with a modern "Emerald" aesthetic and seamless customization.

## Live Demo
🔗 https://your-link.vercel.app

###  Key Features
* **Full Quran (SSG):** All 114 Surahs are pre-rendered for instant, lightning-fast loading.
* **Premium Emerald UI:** A clean, glassmorphic design inspired by modern Islamic aesthetics.
* **Live Customization:** Instantly switch between Arabic fonts (**Amiri/Lateef**) and adjust font sizes via a smooth sidebar.
* **Smart Persistence:** Your display settings (font size, style) are saved to `localStorage` and persist across sessions.
* **Staggered Animations:** Smooth, fade-in transitions for Ayah cards to enhance the reading flow.
* **Fully Responsive:** Optimized for everything from mobile screens to large desktop monitors.

###  Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Custom Emerald Theme)
* **Icons:** Lucide React
* **Data Source:** Al-Quran Cloud API


## Getting Started

### 1. Clone the project
```bash
git clone https://github.com/asadatik/Quran_Reader.git
cd Quran_Reader
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open http://localhost:3000 to see the app.

### 4. Build for production
```bash
npm run build
```

## Project Structure

- `/app` → Route-based pages (SSG/ISR)
- `/components` → UI components (AyahCard, SurahCard, SettingsSidebar)
- `/context` → State management (settings + persistence)
- `/lib` → Data fetching utilities
- `/types` → TypeScript types