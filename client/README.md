# Wealthype Asset Watchlist

A frontend application to explore financial assets (stocks, ETFs, crypto), search within a catalog, and manage a personal watchlist.

This project was developed as part of a technical assessment with a strong focus on **frontend architecture, async data handling, and user experience**, rather than visual polish.

---

## 🎯 Objective

The goal was to build a realistic **Asset Watchlist application**, simulating real-world frontend challenges such as:

* handling asynchronous data and loading states
* managing race conditions during search
* structuring a scalable and maintainable codebase
* providing a consistent and intuitive user experience

---

## 🧱 Tech Stack

* React (Vite)
* TypeScript
* TanStack Query
* React Router
* CSS
* Browser APIs:

  * `localStorage`
  * `sessionStorage`

### Notes on stack choice

The project was implemented using **React**, which was allowed as an alternative to the preferred Svelte/SvelteKit stack.

Instead of relying on a full framework, the application uses **React Router + TanStack Query** to replicate patterns typically provided by frameworks such as Next.js or SvelteKit (routing, data fetching, async state handling).

This approach keeps the focus on architectural decisions and state management.

---

## 🧠 Key Design Decisions

### 1. Server State vs UI State

TanStack Query is used to manage **server state** (assets, categories), while UI state (filters, search) is handled separately.

**Why?**
Server state has different lifecycle rules (caching, refetching, cancellation).
Separating it from UI state reduces complexity and improves predictability.

---

### 2. Feature-Based Architecture

The project is organized by domain:

* `assets`
* `watchlist`
* `assetFilters`

**Why?**
This avoids tightly coupled components and allows the codebase to scale without becoming fragmented.

---

### 3. Custom Hooks as Abstraction Layer

Logic is encapsulated in reusable hooks:

* `useAssets`
* `useAsset`
* `useWatchlist`
* `useAssetFilters`

**Why?**
This keeps components declarative and focused on rendering, while business logic remains reusable and testable.

---

## ✨ Features

### 1. Dashboard – Asset List

* Responsive grid layout
* Asset cards display:

  * symbol
  * name
  * price
  * percentage change (color-coded)
* Toggle watchlist directly from the card

#### UX States

* Skeleton loading during initial fetch
* Background "searching" state during refetch
* Error state with retry
* Empty state with contextual messaging and recovery action

**Why multiple states?**
Real applications are defined by how they handle transitions, not just static data.

---

### 2. Search with Debounce & Race Condition Handling

* Debounced input (400ms)
* Only the latest request updates the UI
* Previous requests are cancelled using `AbortSignal`

**Why?**
Without cancellation, fast typing can lead to inconsistent UI (older responses overriding newer ones).

---

### 3. Filtering System

* Filter by asset category
* Reset filters functionality
* Filters persisted via `sessionStorage`

**Why session-based persistence?**
Filters represent temporary interaction context, not long-term user preferences.

---

### 4. Watchlist

* Add/remove assets from watchlist
* Persisted via `localStorage`

**Why localStorage?**
The watchlist represents a persistent user preference and should survive reloads and sessions.

---

### 5. Asset Detail Page

* Dynamic routing (`/asset/:id`)
* Independent data fetching per asset
* Handles:

  * loading
  * error
  * not found

**Why independent queries?**
Each page is self-contained and does not depend on navigation state.

---

## 🔌 Data Layer

A simulated API layer is used:

* `fetchAssets`
* `fetchAssetById`
* `fetchAssetCategories`

### Behaviors implemented

* simulated network latency
* request cancellation (AbortSignal)
* realistic async flows

**Why simulate an API?**
To focus on frontend architecture while still handling real-world async complexity and edge cases.

---

## 🏗️ Architecture

```text
src/
├── app/
│   ├── router.tsx
│   └── queryClient.ts
│
├── components/
│   ├── AssetCard/
│   ├── AssetCardSkeleton/
│   ├── FiltersBar/
│   ├── SearchBar/
│   ├── CategoryFilter/
│   ├── Spinner/
│   ├── EmptyState/
│   ├── ErrorState/
│   └── PageHeader/
│
├── features/
│   ├── assets/
│   ├── watchlist/
│   └── assetFilters/
│
├── pages/
│   ├── DashboardPage/
│   ├── AssetDetailPage/
│   └── NotFoundPage/
│
├── lib/
│   └── useDebouncedValue.ts
│
└── mocks/
    └── assets.ts
```

---

## 💾 State & Persistence Strategy

| State Type  | Tool           | Reason                            |
| ----------- | -------------- | --------------------------------- |
| Server data | TanStack Query | caching, refetching, cancellation |
| Filters     | sessionStorage | session-scoped UI state           |
| Watchlist   | localStorage   | persistent user preference        |

This mirrors real-world product behavior.

---

## ⚖️ Trade-offs & Decisions

* No real backend → focus on frontend architecture and async behavior
* Simulated API → enables realistic data flows without backend complexity
* Lightweight styling → prioritizes structure and UX over visual system design

The priority was **clarity, correctness, and scalability**.

---

## 🚀 Possible Improvements

* Real backend (e.g. Express)
* URL-based filters (query params)
* Pagination or infinite scroll
* Unit / integration tests
* Design system (tokens, reusable UI primitives)

---

## 🧪 Running the Project

```bash
npm install
npm run dev
npm run build
```

---

## 💡 What This Project Demonstrates

* Ability to structure a scalable frontend architecture
* Understanding of async flows and race conditions
* Clear separation of concerns
* Attention to UX states and real-world behavior
* Use of modern React patterns and data fetching strategies
