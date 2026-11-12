# Lemon Inc. Product Management

A polished product-management dashboard built as a frontend engineering assessment. The implementation follows the supplied Figma reference and the assignment requirements, with responsive navigation, category management, a validated multi-step product flow, and client-side persistence.

## Features

- Responsive desktop sidebar and mobile navigation drawer
- Products dashboard grouped by category
- Add Category modal with duplicate/empty validation
- Add Product flow: Description → Variants → Combinations → Price Info
- React Hook Form + Zod validation
- Dynamic variant combinations generated from option values
- Duplicate SKU validation
- Product/category persistence with Zustand + localStorage
- Image upload preview (client-side, 2 MB limit)
- Keyboard-accessible modal/drawer interactions and visible focus states
- Placeholder routes for non-functional navigation items

## Tech Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Zustand
- Lucide React

## Project Structure

```text
app/                 Routes and global styles
components/          Layout, UI, products and product-form components
data/                Seed categories/products
lib/                 Validation, combination generation and utilities
store/               Zustand application state
types/               Shared TypeScript models
public/images/       Local demo product artwork
```

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

None required.

## Build

```bash
npm run build
```

## Run Production

```bash
npm start
```

## Design Decisions

- UI state stays local; product/category data is global because it is shared between routes.
- React Hook Form owns the entire product form, with `shouldUnregister: false`, so changing steps never discards values.
- Zod provides field and full-form validation.
- Zustand persistence keeps created categories and products after a browser refresh without introducing an unnecessary backend.
- Variant combinations are generated as a Cartesian product and preserve previously entered combination data by combination name.
- Only interactive requirements are implemented; other sidebar routes use an explicit “Coming soon” state instead of dead links.

## Future Improvements

- Replace localStorage persistence with a REST/GraphQL API.
- Upload product images to object storage instead of encoding them in the browser.
- Add product edit/delete flows and server-side validation.
- Add automated unit, component and end-to-end tests.

## GitHub Publishing

```bash
git init
git add .
git commit -m "feat: build product management application"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY>
git push -u origin main
```

## Deployment

This project is ready for deployment on Vercel or another Next.js-compatible platform. No environment variables are required. A live URL is intentionally not claimed because deployment has not been performed from this environment.
