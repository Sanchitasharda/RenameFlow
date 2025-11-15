# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**RenameFlow** is a client-side batch file renaming web application that allows users to rename large batches of files quickly and accurately using rule-based automation. Built entirely with React, TypeScript, and Vite, all processing happens in the browser.

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Zustand (state management), @dnd-kit (drag & drop)
- **Client-Side Processing**: JSZip (ZIP generation), FileSaver (downloads)
- **Development**: ESLint, Prettier, Git

### Architecture
**Client-Only Application** - RenameFlow is designed to run entirely in the browser with no backend server. All file processing, rule application, and ZIP generation happen client-side using Web APIs.

---

## Project Structure

```
RenameFlow/
├── client/                         # Frontend React application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                # Base UI elements (Header, Layout)
│   │   │   ├── upload/            # Upload components (FileUploadZone, FileList)
│   │   │   └── rules/             # Rule configuration components
│   │   │       ├── RuleList.tsx           # Drag & drop rule list
│   │   │       ├── RuleCard.tsx           # Individual rule card
│   │   │       ├── RuleConfigPanel.tsx    # Rule configuration panel
│   │   │       ├── AddRuleDropdown.tsx    # Add new rule dropdown
│   │   │       ├── CasingRuleConfig.tsx   # Casing rule UI
│   │   │       ├── PrefixRuleConfig.tsx   # Prefix rule UI
│   │   │       ├── SuffixRuleConfig.tsx   # Suffix rule UI
│   │   │       ├── NumberingRuleConfig.tsx # Numbering rule UI
│   │   │       └── FindReplaceRuleConfig.tsx # Find & Replace rule UI
│   │   ├── services/               # Business logic services
│   │   │   ├── FileService.ts             # File validation and management
│   │   │   ├── RenameService.ts           # Apply renaming logic
│   │   │   └── rule-engine/              # Rule processors (SOLID architecture)
│   │   │       ├── RuleProcessor.ts       # Abstract base class
│   │   │       ├── RulePipeline.ts        # Sequential rule processing
│   │   │       ├── RuleFactory.ts         # Factory pattern for processors
│   │   │       ├── CasingRuleProcessor.ts
│   │   │       ├── PrefixRuleProcessor.ts
│   │   │       ├── SuffixRuleProcessor.ts
│   │   │       ├── NumberingRuleProcessor.ts
│   │   │       └── FindReplaceRuleProcessor.ts
│   │   ├── types/                  # TypeScript interfaces and types
│   │   │   ├── File.ts            # UploadedFile, FileValidationResult
│   │   │   ├── Rule.ts            # Rule types and enums
│   │   │   └── index.ts           # Central export
│   │   ├── store/                  # Zustand state management
│   │   │   ├── useFileStore.ts    # File state (files, add, remove)
│   │   │   ├── useRuleStore.ts    # Rule state (rules, add, edit, reorder)
│   │   │   ├── useUIStore.ts      # UI state (dark mode, messages)
│   │   │   └── index.ts           # Central export
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useFileUpload.ts   # File upload hook
│   │   ├── utils/                  # Utility functions
│   │   │   ├── fileHelpers.ts     # File manipulation utilities
│   │   │   ├── fileValidation.ts  # File validation logic
│   │   │   └── fileSanitization.ts # Filename sanitization
│   │   ├── assets/                 # Static assets
│   │   ├── App.tsx                 # Main application component
│   │   └── main.tsx                # Application entry point
│   ├── public/                     # Public static files
│   ├── index.html                  # HTML entry point
│   ├── package.json                # Dependencies and scripts
│   ├── vite.config.ts              # Vite configuration (with Tailwind plugin)
│   ├── tailwind.config.js          # Tailwind CSS v4 configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tsconfig.app.json           # App-specific TS config
│   ├── tsconfig.node.json          # Node-specific TS config
│   └── eslint.config.js            # ESLint configuration
│
├── .claude/                        # Claude Code configuration
├── prd-rename flow.txt             # Product Requirements Document
├── structure.txt                   # Detailed structure documentation
├── CLAUDE.md                       # This file
└── .gitignore                      # Git ignore rules
```

---

## Development Commands

### Frontend (client/)
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Note**: There is no backend server. All processing happens client-side.

---

## Current Implementation Status

### ✅ **PHASE 1: Project Foundation & Setup** - COMPLETE
- Vite + React 19 + TypeScript frontend
- Tailwind CSS v4 with dark mode support
- ESLint and Prettier configured
- Project structure following SOLID principles

### ✅ **PHASE 2: Core Data Models & State Management** - COMPLETE
- **Type Definitions** (`src/types/`)
  - `UploadedFile` interface with file metadata
  - `Rule` union type with 5 rule variants
  - `RuleType` enum (CASING, PREFIX, SUFFIX, NUMBERING, FIND_REPLACE)
  - Type-safe rule configurations

- **State Management** (Zustand stores)
  - `useFileStore`: File management (add, remove, update)
  - `useRuleStore`: Rules management (add, edit, delete, reorder)
  - `useUIStore`: UI state (dark mode, error/success messages)

- **Service Layer**
  - `FileService`: File validation
  - `RenameService`: Apply renaming logic with duplicate resolution

### ✅ **PHASE 3: File Upload System** - COMPLETE
- Drag & drop zone with visual feedback (`FileUploadZone.tsx`)
- File input fallback for accessibility
- File list display with metadata (`FileList.tsx`, `FileListItem.tsx`)
- Remove individual files functionality
- File validation (max 500 files, 100MB total, 50MB per file)
- `useFileUpload` custom hook

### ✅ **PHASE 4: Rule Engine - Foundation** - COMPLETE
- **Abstract Rule Processor** (`RuleProcessor.ts`)
  - Base class with `apply()` method
  - Helper methods: `getBasename()`, `getExtension()`, `sanitize()`, `validateFilename()`

- **Rule Processors** (all implemented)
  - `CasingRuleProcessor` - 5 casing types (snake_case, camelCase, PascalCase, UPPERCASE, lowercase)
  - `PrefixRuleProcessor` - Add text before filename
  - `SuffixRuleProcessor` - Add text before extension
  - `NumberingRuleProcessor` - Sequential numbering with padding and placement
  - `FindReplaceRuleProcessor` - Text search/replace with case sensitivity and replace-all options

- **Rule Factory** (`RuleFactory.ts`)
  - Creates appropriate processor for each rule type

- **Rule Pipeline** (`RulePipeline.ts`)
  - Sequential processing of rules
  - Batch processing for multiple files

- **Rule UI Components**
  - `RuleList` with drag & drop reordering (@dnd-kit)
  - `RuleCard` for each rule
  - `RuleConfigPanel` for editing rules
  - `AddRuleDropdown` for adding new rules
  - Configuration UI for each rule type

### 🚧 **PHASE 5: Live Preview System** - IN PROGRESS
- Preview calculation integrated into `RenameService`
- Duplicate detection and resolution implemented
- Real-time preview updates when rules change (via Zustand reactivity)

### 📋 **Remaining Phases**
- **PHASE 6**: Rule Management enhancements (undo/redo, keyboard shortcuts)
- **PHASE 7**: Download & ZIP Generation (JSZip + FileSaver)
- **PHASE 8**: Error Handling & Edge Cases (enhanced validation)
- **PHASE 9**: UI/UX Polish & Accessibility (WCAG AA compliance)
- **PHASE 10**: Testing & Quality Assurance
- **PHASE 11**: Documentation & Final Polish

---

## SOLID Principles Applied

This project strictly follows SOLID principles for maintainability and scalability:

1. **Single Responsibility**: Each service/component has one clear purpose
   - `RenameService`: Handles renaming logic and duplicate resolution only
   - `FileService`: Handles file validation only
   - Each rule processor handles one transformation type

2. **Open/Closed**: Rule processors are extensible without modifying existing code
   - Abstract `RuleProcessor` base class (`src/services/rule-engine/RuleProcessor.ts`)
   - Concrete implementations extend the base class
   - New rule types can be added without changing existing processors

3. **Liskov Substitution**: All rule processors can be used interchangeably
   - All processors implement the same `apply()` method signature
   - `RuleFactory` can create any processor type
   - `RulePipeline` processes any rule without knowing its type

4. **Interface Segregation**: Interfaces are specific to their consumers
   - Each rule type has its own config interface
   - Type-safe union types prevent invalid configurations

5. **Dependency Inversion**: High-level modules depend on abstractions
   - `RulePipeline` depends on `RuleProcessor` abstraction, not concrete implementations
   - `RenameService` uses `RulePipeline` without knowing processor details

---

## Key Architecture Decisions

### Client-Only Architecture
- **All Processing Client-Side**: Files never leave the user's browser
- **No Backend Required**: Simplifies deployment and enhances privacy
- **Web APIs**: FileReader API, Blob API, download via FileSaver
- **ZIP Generation**: JSZip library for creating ZIP files in-browser

### State Management
- **Zustand**: Lightweight, simple API, excellent TypeScript support
- **Reactive Updates**: Components automatically re-render on state changes
- **Computed Values**: Preview automatically recalculates when rules or files change

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **Dark Mode**: Class-based dark mode (toggle in header)
- **Responsive**: Mobile-first approach
- **Tailwind Plugin**: Integrated via `@tailwindcss/vite` in `vite.config.ts`

### Drag & Drop
- **@dnd-kit**: Accessible, performant drag & drop library
- **Sortable**: Rules can be reordered via drag & drop
- **Touch Support**: Works on mobile devices

### File Handling
- **File API**: Browser File objects stored in Zustand
- **No Server Upload**: Files processed directly in browser
- **Validation**: Size, count, and type validation before processing

---

## Type System

### Core Types

#### File Types (`src/types/File.ts`)
```typescript
interface UploadedFile {
  id: string;                 // Unique identifier (crypto.randomUUID())
  originalName: string;       // Original filename
  newName: string;            // Filename after applying rules
  size: number;               // File size in bytes
  type: string;               // MIME type
  file: File;                 // Browser File object
  hasConflict?: boolean;      // Duplicate name detected
  resolvedName?: string;      // Auto-resolved name (e.g., "file_1.txt")
}

const FILE_UPLOAD_LIMITS = {
  MAX_FILES: 500,
  MAX_TOTAL_SIZE: 100 * 1024 * 1024,  // 100MB
  MAX_FILE_SIZE: 50 * 1024 * 1024,    // 50MB
}
```

#### Rule Types (`src/types/Rule.ts`)
```typescript
enum RuleType {
  CASING = 'casing',
  PREFIX = 'prefix',
  SUFFIX = 'suffix',
  NUMBERING = 'numbering',
  FIND_REPLACE = 'findReplace',
}

enum CasingType {
  SNAKE_CASE = 'snake_case',
  CAMEL_CASE = 'camelCase',
  PASCAL_CASE = 'PascalCase',
  UPPER_CASE = 'UPPERCASE',
  LOWER_CASE = 'lowercase',
}

interface BaseRule {
  id: string;
  type: RuleType;
  enabled: boolean;
  name?: string;
}

// Specific rule types extend BaseRule
type Rule = CasingRule | PrefixRule | SuffixRule | NumberingRule | FindReplaceRule;
```

---

## Common Patterns

### Adding a New Rule Type

1. **Define type interface** in `src/types/Rule.ts`
   ```typescript
   export interface MyNewRule extends BaseRule {
     type: RuleType.MY_NEW_TYPE;
     config: {
       // Your config properties
     };
   }

   // Add to union type
   export type Rule = /* ... */ | MyNewRule;
   ```

2. **Create processor class** in `src/services/rule-engine/`
   ```typescript
   export class MyNewRuleProcessor extends RuleProcessor<MyNewRule['config']> {
     apply(filename: string, config: MyNewRule['config']): string {
       // Implementation
       return this.sanitize(newFilename);
     }
   }
   ```

3. **Add to RuleFactory** in `src/services/rule-engine/RuleFactory.ts`
   ```typescript
   case RuleType.MY_NEW_TYPE:
     return new MyNewRuleProcessor();
   ```

4. **Create UI component** in `src/components/rules/`
   ```typescript
   export function MyNewRuleConfig({ rule, onChange }: RuleConfigProps<MyNewRule>) {
     // Config UI
   }
   ```

5. **Add to RuleConfigPanel** in `src/components/rules/RuleConfigPanel.tsx`

6. **Add to AddRuleDropdown** in `src/components/rules/AddRuleDropdown.tsx`

### State Management Pattern

```typescript
// Define store
export const useMyStore = create<MyState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter(i => i.id !== id) })),
}));

// Use in components
function MyComponent() {
  const items = useMyStore((state) => state.items);
  const addItem = useMyStore((state) => state.addItem);

  return <button onClick={() => addItem(newItem)}>Add</button>;
}
```

### Service Pattern

```typescript
// Single responsibility, static methods for pure functions
export class MyService {
  static processData(input: Input): Output {
    // Pure logic, no side effects
    return result;
  }
}
```

---

## File Processing Flow

1. **Upload**: User drags/drops files → `FileUploadZone` → `useFileUpload` hook
2. **Validation**: `FileService.validateFiles()` checks limits
3. **Storage**: Files stored in `useFileStore` as `UploadedFile[]`
4. **Rule Application**:
   - User adds/modifies rules → `useRuleStore`
   - Rules applied via `RenameService.applyRules()`
   - Uses `RulePipeline.applyRulesToBatch()` for processing
5. **Preview**: Updated `newName` displayed in `FileList`
6. **Download**: (To be implemented)
   - Create ZIP with JSZip
   - Rename files in ZIP
   - Trigger download with FileSaver

---

## Zustand Stores

### useFileStore (`src/store/useFileStore.ts`)
```typescript
{
  files: UploadedFile[];
  totalSize: number;
  addFile: (file: UploadedFile) => void;
  addFiles: (files: UploadedFile[]) => void;
  removeFile: (fileId: string) => void;
  updateFileName: (fileId: string, newName: string) => void;
  clearFiles: () => void;
  updateFileConflict: (fileId: string, hasConflict: boolean, resolvedName?: string) => void;
  getFileById: (fileId: string) => UploadedFile | undefined;
}
```

### useRuleStore (`src/store/useRuleStore.ts`)
```typescript
{
  rules: Rule[];
  addRule: (rule: Rule) => void;
  updateRule: (ruleId: string, updates: Partial<Rule>) => void;
  deleteRule: (ruleId: string) => void;
  toggleRule: (ruleId: string) => void;
  reorderRules: (sourceIndex: number, destinationIndex: number) => void;
  clearRules: () => void;
}
```

### useUIStore (`src/store/useUIStore.ts`)
```typescript
{
  darkMode: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
  setDarkMode: (enabled: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  clearMessages: () => void;
}
```

---

## Security Considerations

1. **Client-Side Processing**: Files never uploaded to a server (privacy-first)
2. **Filename Sanitization**: Remove dangerous characters (`:*?"<>|/`)
3. **XSS Prevention**: Sanitize user input in Find & Replace rules
4. **No Path Traversal**: Files processed without directory paths
5. **Size Limits**: Prevent browser crashes (100MB total, 50MB per file)
6. **File Count Limits**: Max 500 files to prevent memory issues

---

## Accessibility Guidelines

1. **Keyboard Navigation**: All features accessible via keyboard
   - Tab through all interactive elements
   - Drag & drop has keyboard alternatives
2. **Screen Readers**:
   - ARIA labels on all buttons/inputs
   - ARIA live regions for success/error messages
   - Semantic HTML (`<button>`, `<input>`, etc.)
3. **Focus Management**: Visible focus indicators (Tailwind focus: utilities)
4. **Color Contrast**: WCAG AA compliance (4.5:1 for text)
5. **Touch Targets**: Minimum 44x44px for mobile
6. **Error Messages**: Clear, descriptive, announced to screen readers
7. **Dark Mode**: Proper contrast in both light and dark themes

---

## Performance Optimization

1. **Debouncing**: Preview calculations can be debounced (300ms)
2. **Memoization**: React.memo for expensive components
3. **Virtual Scrolling**: For large file lists (>100 files) - to be implemented
4. **Lazy Loading**: Code splitting for routes (if needed)
5. **Bundle Optimization**: Vite automatically tree-shakes and minifies
6. **Zustand**: Minimal re-renders (only components using changed state)

---

## Testing Strategy

### Unit Tests (To be implemented)
- All rule processors (`*.test.ts`)
- Utility functions (`fileHelpers`, `fileValidation`, `fileSanitization`)
- State management (Zustand stores)
- File validation logic

### Integration Tests (To be implemented)
- Rule pipeline with multiple rules
- File upload flow
- ZIP generation
- Error scenarios

### Manual Testing Checklist
- [ ] Upload files via drag & drop
- [ ] Upload files via click
- [ ] Add/edit/delete rules
- [ ] Reorder rules via drag & drop
- [ ] Preview updates in real-time
- [ ] Duplicate filename handling
- [ ] Invalid character sanitization
- [ ] Dark/light mode toggle
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

---

## Common Development Tasks

### Running the Development Server
```bash
cd client
npm run dev
```
The app will be available at `http://localhost:5173`

### Building for Production
```bash
cd client
npm run build
```
Output will be in `client/dist/`

### Linting Code
```bash
cd client
npm run lint
```

### Adding a Dependency
```bash
cd client
npm install <package-name>
```

### Dark Mode Toggle
Dark mode state is stored in `useUIStore` and persisted to `localStorage`. The HTML root element gets the `dark` class applied/removed, which activates Tailwind's dark mode variants.

```typescript
// In App.tsx
const { darkMode, setDarkMode } = useUIStore();

// Initialize from localStorage or system preference
useEffect(() => {
  const saved = localStorage.getItem('renameflow-dark-mode');
  if (saved !== null) {
    setDarkMode(saved === 'true');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }
}, [setDarkMode]);
```

---

## Troubleshooting

### Dev Server Won't Start
- Check Node.js version (requires 18+)
- Delete `node_modules` and run `npm install`
- Check for port conflicts (default: 5173)

### TypeScript Errors
- Run `npm run build` to see all errors
- Check `tsconfig.json` configuration
- Ensure all types are properly imported

### Tailwind Not Working
- Verify `@tailwindcss/vite` is in `vite.config.ts`
- Check `index.css` for `@import "tailwindcss";`
- Restart dev server after config changes

### Dark Mode Not Working
- Check if `dark` class is on `<html>` element
- Verify Tailwind config has `darkMode: 'class'`
- Check `useUIStore` for dark mode state

### Drag & Drop Not Working
- Ensure `@dnd-kit/core` and `@dnd-kit/sortable` are installed
- Check browser console for errors
- Verify `DndContext` wraps draggable components

---

## File Naming Conventions

- **Components**: PascalCase (`FileUploadZone.tsx`)
- **Utilities**: camelCase (`fileHelpers.ts`)
- **Types**: PascalCase (`Rule.ts`)
- **Stores**: camelCase with `use` prefix (`useFileStore.ts`)
- **Services**: PascalCase (`RenameService.ts`)
- **Hooks**: camelCase with `use` prefix (`useFileUpload.ts`)

---

## Code Style Guidelines

1. **Imports**: Organize imports in this order:
   - React imports
   - Third-party libraries
   - Internal types
   - Internal components/services/hooks
   - Relative imports

2. **TypeScript**:
   - Use interfaces for object shapes
   - Use type for unions and computed types
   - Prefer type inference where obvious
   - Always type function parameters and return values

3. **React**:
   - Functional components only
   - Use hooks (no class components)
   - Extract complex logic to custom hooks
   - Keep components focused and small

4. **Comments**:
   - Use JSDoc for functions and classes
   - Explain *why*, not *what*
   - Add comments for complex logic only

5. **Tailwind**:
   - Group utilities logically (layout, colors, typography)
   - Use dark mode variants: `dark:bg-gray-800`
   - Responsive utilities: `md:flex-row`

---

## Success Criteria for MVP (Draft 1)

- [x] Upload files via drag & drop
- [x] All 5 rule types functional (Casing, Prefix, Suffix, Numbering, Find & Replace)
- [x] Rules can be added, edited, deleted
- [x] Rules can be reordered via drag & drop
- [x] Live preview updates on rule changes
- [x] Duplicate filename detection and resolution
- [ ] Download renamed files as ZIP (In Progress)
- [ ] Undo/Reset functionality
- [ ] Edge cases handled (invalid chars, empty names)
- [x] Responsive UI (mobile, tablet, desktop)
- [ ] Accessible (WCAG AA)
- [x] Dark/light mode toggle
- [ ] No security vulnerabilities
- [ ] Performance: <1s preview for 100 files

---

## Future Enhancements (Post-MVP)

### Phase 2 Features
- ZIP upload with extraction
- Regex support in Find & Replace
- Dynamic variables (`{date}`, `{time}`, `{counter}`)
- Date metadata extraction (EXIF)

### Phase 3 Features
- Templates/History (save rule sets)
- Import/Export rule configurations
- Batch processing presets

### Phase 4 Features
- Browser extension
- CLI version for developers
- API for automation (if backend added)

---

## Resources

- **PRD**: See `prd-rename flow.txt` in project root
- **Structure**: See `structure.txt` for detailed file documentation
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Tailwind CSS v4**: https://tailwindcss.com/
- **Zustand**: https://github.com/pmndrs/zustand
- **@dnd-kit**: https://dndkit.com/
- **TypeScript**: https://www.typescriptlang.org/

---

## Contact & Deployment

- **Repository**: RenameFlow (GitHub)
- **Deployment**: Static hosting (Vercel, Netlify, GitHub Pages)
- **No Backend Required**: Deploy as static site

---

**Last Updated**: November 2024 (Phase 1-4 Complete)
