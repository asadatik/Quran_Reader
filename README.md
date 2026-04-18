#  Al-Quran — Read & Reflect

A minimalist, high-performance Quran reading application built with **Next.js 14**. Designed for a peaceful and distraction-free experience with a modern "Emerald" aesthetic and seamless customization.

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

###  Getting Started

1. **Clone the project:**
   ```bash
   git clone [https://github.com/asadatik/Quran_Reader.git](https://github.com/asadatik/Quran_Reader.git)
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 to see the app live.

Build for production:

Bash
npm run build
 Project Structure
/app: Route-based pages and layouts (SSG/ISR logic).

/components: Reusable UI like AyahCard, SurahCard, and SettingsSidebar.

/context: State management for display settings and persistence.

/lib: Clean API helpers for fetching Quranic data.

/types: Centralized TypeScript definitions.

The Goal
The mission was to build a modern tool for the Ummah that balances technology with tranquility. By focusing on clean typography and a minimalist interface, this app ensures that the focus remains entirely on the words of the Quran