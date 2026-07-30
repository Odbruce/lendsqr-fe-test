# Lendsqr Front-Office Admin Portal

A modern, responsive, and high-performance front-office administration panel built for Lendsqr. This application provides back-office management capabilities, allowing administrators to monitor users, analyze organizations, process loan statuses, and view granular user dossiers.

---

##  Features

### 1. Authentication
* **Modern Login Page:** Highly polished login interface featuring full form validation (email and password checking) and loading state transitions.
* **Ambient Styling:** Engaging login interface using a dynamic fallback HTML5 video background.
* **Auto-Session Routing:** Checks for active tokens in local storage to automatically redirect authenticated users straight to the dashboard.

### 2. User Directory & Dashboard
* **Statistics Overview:** Display cards showcasing key performance indicators: Total Users, Active Users, Users with Loans, and Users with Savings.
* **Responsive Data Table:** Interactive table presenting user rows, complete with custom pagination controls and configurable page item limits.
* **Sticky Action Column:** On desktop viewports, the vertical action menu (`...`) is pinned to the right side of the screen using sticky positioning. The sticky shadow fades in/out dynamically depending on whether there is underlying content scrolled beneath it.
* **Interactive Filter Drawer:** A slide-out panel allowing admins to filter the directory by organization, username, email, phone number, date joined, and status.
* **Mobile Drawer View:** Smaller screens automatically replace the detailed table layouts and slide-outs with a bottom-sheet mobile row drawer.

### 3. Granular User Profiles
* **Unified Profile Card:** Visual summary highlighting user avatar, name, ID, Tier rating, Account balance, and bank info.
* **Status-Conditional Action Buttons:** Admins can Blacklist or Activate users. Buttons render conditionally based on status (e.g., hiding the "Blacklist User" button if the user is already blacklisted).
* **Responsive Tabs Navigation:** 
  * **Desktop:** Horizontal tab-list detailing Personal Info, Documents, Bank Details, Loans, and Savings.
  * **Mobile:** Automatically converts the tab-list into a stylized select-dropdown element to prevent horizontal overflow and clutter, defaulting to the "General Details" tab on load.

---

##  Tech Stack & Architecture

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) for optimized file-based routing and Server-Side Rendering (SSR).
* **Language:** [TypeScript](https://www.typescript.org/) for compile-time safety and self-documenting code.
* **Styling:** [Sass/SCSS Modules](https://sass-lang.com/) for isolated, modular component styling and design-token variables.
* **State Management & Caching:** [TanStack React Query v5](https://tanstack.com/query/latest) for server state caching, background refetching, and pagination handling.
* **Icons:** Custom SVG iconography tailored to match Lendsqr's official theme.

---

##  Mobile Web Browser Compatibility (WebKit Fix)

During development, we solved a critical client-side React hydration crash on legacy mobile web browsers (iOS/Safari running on WebKit engines prior to version 15.4):
* **The Root Cause:** Next.js development servers serve modern JS bundles raw to optimize hot-reloading speed. These bundles contained ES2022 **Static Initialization Blocks** (`static { ... }`) which threw parsing exceptions on older browsers, disabling React hydration entirely.
* **The Fix:**
  1. Booted the Next.js dev server with Webpack: `next dev --webpack`.
  2. Set up a `browserslist` targeting `Safari >= 13` and `iOS >= 13` to transpile production bundles.
  3. Patched Next.js's internal client classes (within `node_modules/next/dist/client`) to replace static initialization blocks with standard ES6 class property assignments.
  4. Configured `allowedDevOrigins` in `next.config.ts` to authorize WebSocket Hot Module Replacement (HMR) streams from local network IPs .

---

##  Getting Started

### Prerequisites
Ensure you have Node.js installed (v18+ recommended) along with `npm` or `yarn`.

### Installation
1. Clone the repository and navigate to the directory:
   ```bash
   git clone <repository-url>
   cd lendsqr-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server (configured to transpile target JS bundles for local network devices):
   ```bash
   npm run dev
   ```

4. Open the application locally:
   * On your computer: [http://localhost:3000](http://localhost:3000)
   * On your mobile device (on the same Wi-Fi network): `http://<your-local-ip>:3000`

### Build for Production
To bundle and optimize the application (which compiles all assets down to ES6-compliant files specified in the project `browserslist`):
```bash
npm run build
npm run start
```
