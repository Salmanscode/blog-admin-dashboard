# Premium Blog Admin Dashboard

A production-style Admin Dashboard for managing blog content, built with modern frontend principles. This project was developed as part of the Frontend Developer Assessment for **Edwid Tech PVT LTD**.


---

## 🛠️ Chosen Tasks

### 🧠 Brain Task: Schema Migration
I selected *Schema Migration* to demonstrate a robust approach to data persistence. In a real-world application, data structures evolve. This implementation ensures that:
- Every time the application loads, it checks the current version of the stored data.
- If the schema has changed (e.g., adding a new field like `updatedAt` to older records), a sequential migration process runs to update existing `localStorage` data without data loss or UI crashes.
- Logic Location: `src/utils/migrations.js` and integrated into `BlogProvider`.

### ⚡ Quick Logic Tasks
I implemented multiple logic tasks to enhance UX:
  **Persistent Pagination**: Page numbers and "Items per page" preferences are stored in `localStorage`. Users stay on the same page even after a hard refresh.


---

## 🏗️ Folder Architecture

The project follows a modular, feature-oriented structure for scalability:

```text
src/
├── assets/          # Static assets
├── components/
│   ├── shared/      # Common components (Navbar, Sidebar, ImageUpload)
│   └── ui/          # Atomic, reusable UI elements (Button, Card, Modal, etc.)
├── context/         # Global state management (BlogContext)
├── hooks/           # Custom reusable logic (usePagination)
├── layouts/         # Page layout structures (AdminLayout)
├── pages/           # High-level route components (Dashboard, CreateBlog, EditBlog)
├── utils/           # Helper functions (Validators, Migrations)
└── index.css        # Global styles & Tailwind layers
```

---

## 🎨 Design Approach (Cal.com Inspired)
- Aesthetics: Follows a minimalist, high-contrast aesthetic. It uses sharp borders, subtle shadows, and a clean "Inter" typography stack.
- Responsiveness: The dashboard is **fully mobile-responsive**. 
    - The sidebar collapses into a floating minimalist menu on small screens.
    - Stats cards transition from a 4-column desktop grid to a 2-column mobile grid.
    - Blog list items stack vertically (image above text) on mobile to maintain readability.
- UX: Uses glassmorphism for the navbar and smooth transitions for interactive elements.

---

## ✨ Features
- **Full CRUD**: Create, Read, Update, and Delete blog posts.
- **Image Management**: Base64 storage with preview and strict 1MB JPG/PNG validation.
- **Advanced Filtering**: Filter by Category and Status simultaneously with real-time search.
- **Stability**: Robust error handling for invalid dates and malformed data to prevent app crashes.

---

## 💻 Setup & Run Instructions

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd blog-admin-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📝 Assessment Compliance
- [x] No UI Libraries (Pure Tailwind + Headless Logic).
- [x] LocalStorage Persistence.
- [x] Responsive Admin Layout.
- [x] Search + Filters + Persistent Pagination.
- [x] Image Validation & Preview.
- [x] Schema Migration Implementation.

---
Developed by Md Salman Nasir
```
