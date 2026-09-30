# Phase 2 — Tooling Swap Migration Plan

Four independent changes. Each can be done and merged separately. No app behavior changes in any step.

---

## Step 1 — CRA → Vite

**Goal:** eliminate ~288 dependency vulnerabilities, cut cold-start and build time dramatically.

### 1.1 Remove CRA
```
npm uninstall react-scripts
```
Remove the `eject` script from `package.json`.

### 1.2 Install Vite
```
npm install -D vite @vitejs/plugin-react
```

### 1.3 Create `vite.config.js`
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

### 1.4 Update `package.json` scripts
```json
"start": "vite",
"build": "vite build",
"preview": "vite preview"
```

### 1.5 Move and update `index.html`
- Move `public/index.html` to the project root.
- Replace `%PUBLIC_URL%/` prefixes with `/`.
- Add entry point script just before `</body>`:
  ```html
  <script type="module" src="/src/index.js"></script>
  ```

### 1.6 Rename env vars
| Old (`process.env`) | New (`import.meta.env`) |
|---|---|
| `REACT_APP_GITHUB_CLIENT_ID` | `VITE_GITHUB_CLIENT_ID` |
| `REACT_APP_GITHUB_CLIENT_SECRET` | `VITE_GITHUB_CLIENT_SECRET` |

Update `GithubState.js` references and `.env.example`.

The production vars (`GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` read via plain `process.env` in the current code) are no longer needed once the build-time `import.meta.env` vars are in place — Netlify should store `VITE_GITHUB_CLIENT_ID` and `VITE_GITHUB_CLIENT_SECRET`.

### 1.7 Update `.prettierignore`
Replace `build` with `dist` (Vite's default output directory).

### 1.8 Update CI workflow (`.github/workflows/ci.yml`)
- Replace `npm start` / `npm run build` references with Vite equivalents (build command stays `npm run build`; no change needed if CI only runs `build`).

### 1.9 Verify
```
npm run build   # should produce dist/
npm run start   # dev server starts at localhost:5173
```

---

## Step 2 — Jest 26 + Enzyme → Vitest + React Testing Library

**Goal:** modern ESM-native test runner that works with Vite's module graph; drop the broken Enzyme/React 16 adapter.

### 2.1 Remove old test deps
```
npm uninstall enzyme enzyme-adapter-react-16 jest react-test-renderer
```

### 2.2 Install Vitest + RTL
```
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2.3 Add test config to `vite.config.js`
```js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
```

### 2.4 Create `src/setupTests.js`
```js
import "@testing-library/jest-dom";
```

### 2.5 Update `package.json` test script
```json
"test": "vitest run"
```

### 2.6 Migrate existing tests (`src/__tests__/utils.test.js`)
The 7 tests cover pure utility functions (`capitalizeFirstChar`, `titleCase`, `truncateText`, `favouriteLanguage`) — no React rendering involved. They use only `describe`/`it`/`expect`, which Vitest supports with no changes needed when `globals: true` is set.

Verify all 7 pass:
```
npm test
```

---

## Step 3 — Moment.js → date-fns

**Goal:** drop ~65 kb from the bundle (moment + moment-timezone are heavy and tree-shake poorly).

### 3.1 Remove moment
```
npm uninstall moment moment-timezone
```

### 3.2 Install date-fns
```
npm install date-fns
```

### 3.3 Update the 4 call sites

**`src/context/github/githubReducer.js`** — sort by `updated_at`:
```js
// before
import moment from "moment";
moment(b.updated_at).diff(moment(a.updated_at))

// after
import { parseISO } from "date-fns";
parseISO(b.updated_at) - parseISO(a.updated_at)
```

**`src/components/repos/Repos.js`** — same sort pattern, same replacement.

**`src/components/repos/RepoItem.js`** — format date:
```js
// before
import moment from "moment";
moment(updated_at).format("YYYY-MM-DD")

// after
import { format, parseISO } from "date-fns";
format(parseISO(updated_at), "yyyy-MM-dd")
```

**`src/components/users/User.js`** — format date, same replacement as RepoItem.

### 3.4 Verify
Run the app and open a user profile — repo and account dates should render correctly.

---

## Step 4 — TypeScript

**Goal:** add static types with zero logic changes. The Phase 1 bugs (wrong JSX return, `loadind` typo, stale closure) would all have been caught at compile time.

### 4.1 Install TypeScript + types
```
npm install -D typescript @types/react @types/react-dom @types/react-router-dom
```

### 4.2 Create `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "allowJs": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### 4.3 Rename files
- All `src/**/*.js` → `.tsx` (components) or `.ts` (pure logic/utils/reducers/constants).
- `src/index.js` → `src/index.tsx`
- `src/App.js` → `src/App.tsx`

### 4.4 Add types — key files

**Context types** (`src/context/github/githubContext.ts`):
```ts
export interface GithubUser { login: string; avatar_url: string; /* … */ }
export interface GithubRepo { id: number; name: string; updated_at: string; /* … */ }
export interface GithubContextType {
  users: GithubUser[];
  user: Partial<GithubUser>;
  repos: GithubRepo[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
  clearUsers: () => void;
  getUser: (username: string) => Promise<void>;
  getUserRepos: (username: string) => Promise<void>;
  /* … */
}
```

**Reducer action union** (`src/context/github/githubReducer.ts`):
```ts
type GithubAction =
  | { type: "SEARCH_USERS"; payload: GithubUser[] }
  | { type: "GET_USER"; payload: GithubUser }
  | { type: "SET_LOADING" }
  | { type: "CLEAR_USERS" }
  /* … */;
```

**Component props** — annotate all props interfaces inline or in a colocated `.types.ts` file.

### 4.5 Add type-check to CI
```yaml
- name: Type check
  run: npx tsc --noEmit
```

### 4.6 Verify
```
npx tsc --noEmit   # zero errors
npm run build      # still produces dist/
npm test           # all 7 tests pass
```

---

## Suggested Order

Steps 1–3 are low-risk and fast. Step 4 (TypeScript) is most effort but builds on the cleaner base.

| # | Change | Risk | Estimated effort |
|---|---|---|---|
| 1 | CRA → Vite | Medium (config surface) | ~2 h |
| 2 | Jest → Vitest | Low | ~1 h |
| 3 | Moment → date-fns | Low | ~30 min |
| 4 | TypeScript | Medium (rename + annotate 36 files) | ~4 h |

Do Step 1 first — it's the prerequisite for Step 2 (Vitest integrates with Vite's config). Steps 3 and 4 can be done in any order after that.
