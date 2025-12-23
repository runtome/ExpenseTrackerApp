# Copilot instructions for ExpenseTrackerApp

Short, actionable instructions to help AI assistants make productive changes quickly.

## Quick summary

- Expo (React Native) app using **Expo Router** (file-based routing) and **TypeScript (strict)**.
- App-wide state: `ExpensesContext` (useReducer) initialized from `data/dummy-expenses.ts`.
- UI primitives live under `components/ui/`; feature UI under `components/*`.
- Styling and theming: `constants/styles.ts` (`GlobalStyles`) and `hooks/use-color-scheme.ts`.

## How to run (important commands)

- Install deps: `npm install`
- Start dev server: `npm start` or `npx expo start`
- Run on simulator/device: `npm run ios` / `npm run android` / `npm run web`
- Lint: `npm run lint` (uses `expo lint`)
- Project reset helper: `npm run reset-project` (see `scripts/reset-project.js`)

## Architecture & patterns (what to know)

- Routing: uses `expo-router` with file-based routes under `app/`.

  - Tabs are defined under `app/(tabs)/_layout.tsx` (see `Tabs.Screen` definitions).
  - Modal screen `ManageExpense` is presented from `app/_layout.tsx` via `<Stack.Screen name="(screens)/ManageExpense" presentation="modal" />`.
  - To programmatically navigate use `router.push('/ManageExpense')` or `useNavigation()` / `useRouter()`.

- State & data flow

  - `ExpensesContext` (in `store/expenses-context.tsx`) provides `expenses`, `addExpense`, `updateExpense`, `deleteExpense`.
  - Initial data comes from `data/dummy-expenses.ts` and `models/expense.ts` defines the `Expense` shape.
  - Actions use `type` strings `ADD`, `UPDATE`, `DELETE` in `useReducer`.

- File + component conventions

  - Feature components grouped in `components/{Feature}/` (e.g., `ManageExpense/ExpenseForm.tsx`).
  - Shared UI primitives (buttons, icon wrappers) are in `components/ui/` and used across screens.
  - Icon portability: `IconSymbol` maps SF Symbols -> Material Icons for non-iOS platforms (`components/ui/icon-symbol.tsx`). If you add SF Symbols, map them here.

- TypeScript and imports
  - Project uses `paths` alias `@/*` (see `tsconfig.json`) — use `@/` imports (e.g., `@/components/...`).
  - `strict` TS rules are enabled; prefer typed props and explicit interfaces.

## Small but critical details

- Date formatting uses `utils/date.ts` and returns `dd-mm-yyyy` (used by the UI).
- Color tokens are in `constants/styles.ts` — use these to match theme colors.
- Platform-specific implementation: there are iOS-specific icon files (e.g., `icon-symbol.ios.tsx`) — review platform variants when changing icon behavior.
- No test framework or CI found in repo — add tests only after confirming the preferred tooling.

## Where to look for common changes (examples)

- Add a new screen: create `app/(screens)/NewScreen.tsx` and hook into navigation or `router.push('/NewScreen')`.
- Add a tab: edit `app/(tabs)/_layout.tsx`, add `Tabs.Screen` with `tabBarIcon` using `IconSymbol`.
- Modify global state: change `store/expenses-context.tsx` reducer and ensure action shapes are respected.

## Pull request guidance for AI changes

- Keep changes scoped and compile locally with `npm start` / `expo start` before proposing.
- Run `expo lint` and fix lint errors; TypeScript `strict` will surface issues early.
- Include explicit file references in PR description and a brief explanation of the regression risk (e.g., UI layout or navigation side effects).

---

If any section is unclear or you want more examples (e.g., component-level patterns, preferred testing tools, or where to persist data), say which area to expand and I’ll update this file.
