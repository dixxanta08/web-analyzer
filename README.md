# 🌐 Website Performance Analyzer

A responsive, single-page React app that analyzes any website’s performance. Enter a URL to view key metrics such as load time, page size, request count, and content breakdown in a clean, user-friendly dashboard.

---

## 📐 Features

### 🔎 Core Functionality

- Enter any website URL to analyze performance.
- Displays metrics using the Google PageSpeed Insights API.

---

## 🛠️ Tech Stack

- **React (Vite)**
- **Tailwind CSS** + **DaisyUI**
- **React Table**
- **Framer Motion**
- **Heroicons / Feather Icons**
- **Google PageSpeed Insights API**
- **react-bits** and **react-parallax-tilt** for animation (Particles Background, Shiny Texts)
- **SonarLint** for linting

---

## 🤖 AI & Tooling Used

### ✅ UI Mockup Assistance

- **Readdy.AI** — Designed the UI layout, including:

  - Component structure (cards, tables, header)
  - Color palette, spacing system, dark mode strategy
  - Mobile-first responsive layout planning

  **Prompt provided to Readdy.AI:**

  > Design a clean, modern, responsive single-page React app UI named “Website Performance Analyzer.”  
  > Users enter any website URL to instantly see detailed performance metrics: load time, page size, HTTP requests, and content breakdown.  
  > [Layout, table behavior, color scheme, typography, and accessibility guidelines detailed here.]

---

### ✅ Development Assistance

- **ChatGPT (OpenAI)** — Used for:

  - Understanding Google PageSpeed Insights API response structure
  - Prompt engineering for UI interaction behavior
  - Accessibility and UX improvements
  - Debugging dark mode issue with DaisyUI (`data-theme` typo)

- **GitHub Copilot** — Used for:
  - Auto-suggesting logic for data parsing and JSX/TSX scaffolding
  - Completing Tailwind classes and React component hooks
  - Minor bug fixes and structure polishing
