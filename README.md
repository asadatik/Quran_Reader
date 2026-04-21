#  Al-Quran — Read & Reflect

A minimalist, high-performance Quran reading application built with **Next.js 14**. Designed for a peaceful and distraction-free experience with a modern "Emerald" aesthetic and seamless customization.

## Live Demo
🔗 https://quran-app-six-iota.vercel.app

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

## 📁 Project Structure
 
```
quran-app/
├── app/
│   ├── globals.css              
│   ├── layout.tsx               
│   ├── page.tsx                 
│   ├── loading.tsx             
│   ├── error.tsx              
│   └── surah/
│       └── [id]/
│           ├── page.tsx         # Surah detail page (SSG)
│           ├── loading.tsx     
│           └── error.tsx       
├── components/
│   ├── Navbar.tsx               
│   ├── SearchBar.tsx            # Search input component
│   ├── SettingsSidebar.tsx      # Settings panel (font + size controls)
│   ├── SurahCard.tsx            # Surah card for grid
│   ├── AyahCard.tsx             # Individual verse/ayah display
│   ├── SurahListClient.tsx      # Home page client (search state)
│   └── SurahPageClient.tsx      # Surah page client (search + nav)
├── context/
│   └── SettingsContext.tsx      # Settings state + localStorage persistence
├── lib/
│   └── api.ts
├── types/
│   └── index.ts               
├── tailwind.config.ts         
├── tsconfig.json
├── next.config.js
├── postcss.config.js         
├── package.json
└── README.md                   
```


### API Source
- **Endpoint**: [Al-Quran Cloud API](https://alquran.cloud/api)
- **Editions**:
  - `quran-uthmani` — Standard Arabic Quran text
  - `en.asad` — Muhammad Asad's English translation
- **Rate limits**: No strict rate limits; requests cached with ISR


